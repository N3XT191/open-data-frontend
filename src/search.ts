import { sortedIndexOf } from "lodash";
import { useState, useEffect, useRef, useMemo } from "react";
import { baseURL, getSearchResults } from "./api";
import { Question } from "./Interfaces";

function stemWord(w: string, dictionary: Dictionary | undefined) {
  if (w === "does") {
    return w;
  }
  const stemmed = w.replace(/s$/, "");
  if (!dictionary || dictionary.hasWord(stemmed)) {
    return stemmed;
  }
  return w;
}

const stopWords = new Set(
  "a the does did how much is in zurich use there what whats where"
    .split(" ")
    .map((w) => stemWord(w, undefined))
);

function roughTokenize(s: string, dictionary: Dictionary): string[] {
  const slug = s
    .replace(/'/g, "")
    .replace(/[^a-zA-Z]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!slug) {
    return [];
  }
  return slug
    .split(" ")
    .map((w) => stemWord(w.toLowerCase(), dictionary))
    .filter((w) => !stopWords.has(w));
}

export class Dictionary {
  private chunks = new Map<string, DictionaryChunk | undefined>();
  private chunkRequests = new Map<string, Promise<void>>();

  hasWord(w: string): boolean {
    const chunkName = Dictionary.chunkNameFromWord(w);
    const chunk = this.chunks.get(chunkName);
    if (!chunk) {
      return false;
    }
    return chunk.hasWord(w);
  }

  getDistances(w: string, questionCount: number): Float32Array | undefined {
    const chunkName = Dictionary.chunkNameFromWord(w);
    const chunk = this.chunks.get(chunkName);
    if (!chunk) {
      return undefined;
    }
    return chunk.getDistances(w, questionCount);
  }

  tryLoadWord(w: string): Promise<void> {
    return this.loadChunkIfMissing(Dictionary.chunkNameFromWord(w));
  }

  async checkSupport(): Promise<boolean> {
    try {
      await this.loadChunkIfMissing(Dictionary.chunkNameFromWord("walrus"));
      return true;
    } catch (err) {
      return false;
    }
  }

  private async loadChunkIfMissing(chunkName: string): Promise<void> {
    if (this.chunks.has(chunkName)) {
      return;
    }
    const oldRequest = this.chunkRequests.get(chunkName);
    if (oldRequest) {
      return oldRequest;
    }
    const newRequest = (async () => {
      try {
        const chunk = await DictionaryChunk.fetch(chunkName);
        this.chunks.set(chunkName, chunk);
      } finally {
        this.chunkRequests.delete(chunkName);
      }
    })();
    this.chunkRequests.set(chunkName, newRequest);
    return newRequest;
  }

  private static chunkNameFromWord(w: string) {
    const l = 2;
    return w.slice(0, l).padEnd(l, "_");
  }
}

class DictionaryChunk {
  constructor(private words: string[], private distances: Float32Array) {}

  hasWord(word: string): boolean {
    return this.getWordIndex(word) !== undefined;
  }

  getDistances(w: string, questionCount: number): Float32Array | undefined {
    if (questionCount * this.words.length !== this.distances.length) {
      throw new Error("distances has wrong length");
    }
    const i = this.getWordIndex(w);
    if (i === undefined) {
      return undefined;
    }
    return this.distances.subarray(i * questionCount, (i + 1) * questionCount);
  }

  private getWordIndex(w: string): number | undefined {
    const i = sortedIndexOf(this.words, w);
    if (i < 0) {
      return undefined;
    }
    return i;
  }

  static async fetch(chunkName: string): Promise<DictionaryChunk | undefined> {
    const [wordRes, distancesRes] = await Promise.all([
      fetch(baseURL + `/search/chunk_${chunkName}_words.json`),
      fetch(baseURL + `/search/chunk_${chunkName}_distances`),
    ]);
    if (wordRes.status === 404) {
      return undefined;
    }
    if (!wordRes.ok || !distancesRes.ok) {
      throw new Error("server returned non-200 status");
    }
    const [words, distancesRaw] = await Promise.all([
      wordRes.json(),
      distancesRes.arrayBuffer(),
    ]);
    return new DictionaryChunk(words, new Float32Array(distancesRaw));
  }
}

function prepareDictionaryForSearch(
  query: string,
  dictionary: Dictionary
): Promise<unknown> {
  const queryWords = roughTokenize(query, dictionary);
  console.log("DEBUG queryWords", queryWords);
  return Promise.all(
    queryWords.map((w) =>
      dictionary
        .tryLoadWord(w)
        .catch((err) =>
          console.warn("failed to load dictionary chunk for word", w, err)
        )
    )
  );
}

export interface SearchResult {
  id: number;
}

function search(
  query: string,
  dictionary: Dictionary,
  questions: Question[]
): SearchResult[] {
  const queryWords = roughTokenize(query, dictionary);
  const distances = queryWords.map((w) =>
    dictionary.getDistances(w, questions.length)
  );
  // TODO
  return [{ id: 10 }, { id: 20 }, { id: 30 }];
}

export function useSearch(
  query: string,
  questions: Question[]
): SearchResult[] {
  const dictionaryRef = useRef(new Dictionary());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_dictionaryUpdateFlag, setDictionaryUpdateFlag] = useState(false);

  const [staticSearchSupported, setStaticSearchSupported] = useState<boolean>();

  useEffect(() => {
    dictionaryRef.current
      .checkSupport()
      .then((v) => setStaticSearchSupported(v));
  }, []);

  useEffect(() => {
    if (staticSearchSupported !== false) {
      prepareDictionaryForSearch(query, dictionaryRef.current).then(() =>
        setDictionaryUpdateFlag((v) => !v)
      );
    }
  }, [query, staticSearchSupported]);

  const staticSearchResults: SearchResult[] = useMemo(
    () => search(query, dictionaryRef.current, questions),
    [query, questions]
  );

  const [dynamicSearchResults, setDynamicSearchResults] = useState<
    SearchResult[]
  >([]);
  useEffect(() => {
    if (staticSearchSupported) {
      return;
    }

    if (!query.trim()) {
      setDynamicSearchResults([]);
    }

    let shouldIgnore = false;

    getSearchResults(query)
      .then((res) => {
        if (!shouldIgnore) {
          setDynamicSearchResults(res);
        }
      })
      .catch((err) => console.error("search failed", err));

    return () => {
      shouldIgnore = true;
    };
  }, [query, staticSearchSupported]);

  return staticSearchSupported === false
    ? dynamicSearchResults
    : staticSearchResults;
}
