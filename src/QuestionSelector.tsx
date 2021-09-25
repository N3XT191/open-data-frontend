import { css } from "@emotion/css";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";
import Fuse from "fuse.js";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { Question } from "./Interfaces";

const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: ["text"],
};

const styles = {
  wrapper: css`
    max-width: 800px;
    margin: 0 auto;
    margin-top: 300px;
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
  `,
  activeSuggestion: css`
    background: #743fca;
    color: white;
  `,
  enterHint: css`
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: calc(100% + 10px);
    height: 100%;
    background: #743fca;
    font-size: 20px;
    text-align: center;
    padding: 0 10px;
  `,
};

const maxSuggestions = 3;

interface Props {
  questions: Question[];
  onSelect: (id: number | undefined) => void;
}

const QuestionSelector: React.FC<Props> = ({ questions, onSelect }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fuse = useMemo(() => new Fuse(questions, fuseOptions), [questions]);
  const suggestions = useMemo(() => {
    const inputValue = searchValue.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : fuse.search(searchValue).slice(0, maxSuggestions);
  }, [searchValue, fuse]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions]);

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
        ev.preventDefault();
        ev.stopPropagation();
        const offset = ev.key === "ArrowUp" ? -1 : 1;
        setSelectedIndex((i) =>
          Math.max(
            0,
            Math.min(suggestions.length - 1, maxSuggestions - 1, i + offset)
          )
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          if (suggestions.length) {
            const s = suggestions[selectedIndex];
            if (s) {
              onSelect(s.item.id);
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
          <div
            key={s.item.id}
            className={[styles.suggestion, active && styles.activeSuggestion]
              .filter((v) => v)
              .join(" ")}
            onClick={() => onSelect(s.item.id)}
          >
            {s.item.text}
            {active && <div className={styles.enterHint}>Press enter</div>}
          </div>
        );
      })}
    </div>
  );
};
export default QuestionSelector;
