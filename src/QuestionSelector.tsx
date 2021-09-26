import { css } from "@emotion/css";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getSearchResults } from "./api";
import { Question } from "./Interfaces";
import { colors, greys } from "./victory-theme";

const styles = {
  wrapper: css`
    max-width: 800px;
    margin: 0 auto;
    margin-top: calc((100vh - 350px) / 2);
  `,
  questionInput: css`
    border: none;
    padding: 0 10px;
    margin: 0;
    margin-bottom: 30px;
    width: 240px;
    background: none;
    font-size: 45px;
    font-weight: 500;
    width: 100%;
    box-sizing: border-box;
  `,
  suggestion: css`
    position: relative;
    font-size: 45px;
    width: 100%;
    padding: 5px 20px;
    box-sizing: border-box;
    background: ${greys[3]};
  `,
  activeSuggestion: css`
    color: white;
    background: ${colors[0]} !important;
  `,
  enterHint: css`
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: calc(100% + 10px);
    height: 100%;
    background: ${colors[0]};
    font-size: 20px;
    text-align: center;
    padding: 0 10px;
  `,
};

const maxSuggestions = 3;

interface Props {
  questions: Question[];
}

interface SearchResult {
  id: number;
  rank: number;
}

const QuestionSelector: React.FC<Props> = ({ questions }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [listOffset, setListOffset] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResult[]>();

  const hasSearchValue = !!searchValue.trim();

  useEffect(() => {
    if (!hasSearchValue) {
      setSearchResults([]);
    }

    let shouldIgnore = false;

    getSearchResults(searchValue)
      .then((res) => {
        if (!shouldIgnore) {
          setSearchResults(res);
        }
      })
      .catch((err) => console.error("search failed", err));

    return () => {
      shouldIgnore = true;
    };
  }, [hasSearchValue, searchValue]);

  const allSuggestions = useMemo(() => {
    if (!hasSearchValue) {
      return questions;
    }
    if (hasSearchValue && !searchResults) {
      return [];
    }
    return (searchResults || [])
      .map((r) => questions.find((q) => q.id === r.id))
      .filter((v) => v)
      .map((v) => v!);
  }, [hasSearchValue, searchResults, questions]);

  const suggestions = useMemo(
    () => allSuggestions.slice(listOffset, maxSuggestions + listOffset),
    [listOffset, allSuggestions]
  );

  useEffect(() => {
    setSelectedIndex(0);
    setListOffset(0);
  }, [allSuggestions]);

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
        ev.preventDefault();
        ev.stopPropagation();
        const offset = ev.key === "ArrowUp" ? -1 : 1;
        if (selectedIndex === 2 && ev.key === "ArrowDown") {
          setListOffset((i) =>
            Math.min(i + 1, allSuggestions.length - maxSuggestions + 1)
          );
        } else if (selectedIndex === 0 && ev.key === "ArrowUp") {
          setListOffset((i) => Math.max(i - 1, 0));
        } else {
          setSelectedIndex((i) => i + offset);
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });
  const history = useHistory();

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          if (suggestions.length) {
            const s = suggestions[selectedIndex];
            if (s) {
              history.push("/ask/" + s.id);
            }
          }
        }}
      >
        <input
          className={styles.questionInput}
          placeholder="Type your question..."
          value={searchValue}
          onChange={(ev) => setSearchValue(ev.target.value)}
          autoFocus
        />
      </form>
      {suggestions.map((s, i) => {
        const active = i === selectedIndex;
        return (
          <Link to={"/ask/" + s.id}>
            <div
              key={s.id}
              className={[styles.suggestion, active && styles.activeSuggestion]
                .filter((v) => v)
                .join(" ")}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              {s.text}
              {active && <div className={styles.enterHint}>Press enter</div>}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default QuestionSelector;
