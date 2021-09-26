import { css } from "@emotion/css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { askQuestion, chartSettings } from "./api";
import Chart from "./Chart";
import { Answer, Question } from "./Interfaces";
import { globalLastSeenQuestionsRef } from "./last-seen-questions";
import { QuestionText } from "./QuestionText";
import { colors } from "./victory-theme";

interface Props {
  question: Question;
  windowSize: { width: number; height: number };
}

const styles = {
  question: css`
    margin: 50px;
    margin-top: 0;
    padding-top: 50px;
    margin-right: 150px;

    @media (max-width: 900px) {
      margin: 20px;
      margin-top: 0;
      padding-top: 20px;
      margin-right: 150px;
    }
  `,
  toolbar: css`
    display: flex;
    justify-content: center;
    margin: 30px 0;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  `,
  button: css`
    background: none;
    border: none;
    background: ${colors[0]};
    margin: 10px 10px;
    padding: 15px 30px;
    font-size: 18px;
    color: white;
    cursor: pointer;
    @media (max-width: 480px) {
      flex-direction: column;
      width: calc(100% -20px);
    }
  `,
  mainBody: css`
    height: calc(100% - 280px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 700px) {
      height: calc(100% - 150px);
    }
  `,
};

const AnswerPage: React.FC<Props> = ({ question, windowSize }) => {
  const animateFromOffsetRef = useRef(
    globalLastSeenQuestionsRef.current.find((e) => e.id === question.id)?.offset
  );
  console.log("DEBUG animateFromOffsetRef", animateFromOffsetRef);

  const [answer, setAnswer] = useState<Answer | undefined>();

  const mountedAtRef = useRef(Date.now());

  useEffect(() => {
    let shouldCancel = false;
    const getData = async () => {
      setAnswer(undefined);
      const answer_data = await askQuestion(question.id);

      const targetDelay = 500;
      const delay = Math.max(
        0,
        Math.min(targetDelay, targetDelay - (Date.now() - mountedAtRef.current))
      );
      if (delay) {
        await new Promise((resolve) =>
          setTimeout(
            () => resolve("HACK delay to prevent animation stutter"),
            delay
          )
        );
      }

      if (!shouldCancel) {
        setAnswer(answer_data);
      }
    };
    getData();

    return () => {
      shouldCancel = true;
    };
  }, [question]);

  const maxWidth = 800;
  const minWidth = 300;
  let width = windowSize.width
    ? Math.min(Math.max(windowSize.width - 200, minWidth), maxWidth)
    : minWidth;

  const maxHeight = 800;
  const minHeight = 300;
  let height = windowSize.height
    ? Math.min(Math.max(windowSize.height - 350, minHeight), maxHeight)
    : minHeight;

  const isMap = chartSettings.some(
    (s) => s.id === question.id && s.chart_type === "map"
  );
  if (isMap) {
    width *= 0.8;
    height *= 0.8;
  }

  return (
    <div style={{ height: "100%" }}>
      <div className={styles.question}>
        <AnimatePresence>
          <motion.div layoutId={`question-${question.id}`}>
            <QuestionText text={question.text} windowSize={windowSize} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.mainBody}>
        {answer ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Chart chart={answer} width={width} height={height} />
          </motion.div>
        ) : (
          <div style={{ width, height }} />
        )}
        <div className={styles.toolbar}>
          <button className={styles.button}>Share poster</button>
          <Link to="/ask">
            <button className={styles.button}>Ask another question</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnswerPage;
