import { css } from "@emotion/css";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Question } from "../Interfaces";
import { useSearch } from "../logic/search";
import { colors, greys } from "../victory-theme";
import { QuestionText } from "./QuestionText";

const styles = {
  wrapper: css`
    max-width: 800px;
    margin: 0 auto;
    margin-top: calc((100vh - 600px) / 2);

    @media (max-width: 900px) {
      margin: 0;
      padding: 5px;
    }
  `,
  appName: css`
    font-size: 60px;
    text-align: center;
    margin-bottom: 60px;

    @media (max-width: 500px) {
      font-size: 40px;
      margin-bottom: 20px;
    }
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

    @media (max-width: 900px) {
      font-size: 30px;
      margin-bottom: 20px;
    }
  `,
  suggestion: css`
    position: relative;
    font-size: 45px;
    width: 100%;
    padding: 5px 20px;
    box-sizing: border-box;
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
  windowSize: { width: number; height: number };
}

export const QuestionSelector = ({ questions, windowSize }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [listOffset, setListOffset] = useState(0);

  const searchResults = useSearch(searchValue, questions);

  const hasSearchValue = !!searchValue.trim();

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
    [listOffset, allSuggestions],
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
            Math.min(i + 1, allSuggestions.length - maxSuggestions + 1),
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
      <div className={styles.appName}>Ask Open Data</div>
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
      <div>
        {suggestions.map((s, i) => {
          const active = i === selectedIndex;
          return (
            <Link key={s.id} to={"/ask/" + s.id}>
              <motion.div
                layoutId={`question-${s.id}`}
                className={styles.suggestion}
                style={
                  active
                    ? { color: "white", background: colors[0] }
                    : { background: greys[3] }
                }
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <QuestionText text={s.text} windowSize={windowSize} />
                {active && windowSize.width >= 1100 && (
                  <div className={styles.enterHint}>Press enter</div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
