import { css } from "@emotion/css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { askQuestion, chartSettings } from "./api";
import Chart from "./Chart";
import { Answer, Question } from "./Interfaces";
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

    @media (max-width: 500px) {
      flex-direction: column;
      align-items: stretch;
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

    @media (max-width: 500px) {
      flex-direction: column;
      width: calc(100% - 20px);
      box-sizing: border-box;
    }
  `,
  buttonLink: css`
    @media (max-width: 500px) {
      display: block;
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

export function getChartSize(
  question: Question,
  windowSize: { width: number; height: number }
): { width: number; height: number } {
  let widthPadding = 200;
  let heightPadding = 350;
  if (windowSize.width <= 900) {
    widthPadding = 50;
    heightPadding = 300;
  }

  const maxWidth = 800;
  const minWidth = 300;
  let width = windowSize.width
    ? Math.min(Math.max(windowSize.width - widthPadding, minWidth), maxWidth)
    : minWidth;

  const maxHeight = 800;
  const minHeight = 300;
  let height = windowSize.height
    ? Math.min(
        Math.max(windowSize.height - heightPadding, minHeight),
        maxHeight
      )
    : minHeight;

  const isMap = chartSettings.some(
    (s) => s.id === question.id && s.chart_type === "map"
  );
  if (isMap) {
    width *= 0.8;
    height *= 0.8;
  }

  return { width, height };
}

const AnswerPage: React.FC<Props> = ({ question, windowSize }) => {
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

  const { width, height } = getChartSize(question, windowSize);

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
          <motion.div
            initial={{ opacity: 0, scale: 0.9, translateY: 50 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
          >
            <Chart chart={answer} width={width} height={height} />
          </motion.div>
        ) : (
          <div style={{ width, height }} />
        )}
        {answer && (
          <motion.div
            className={styles.toolbar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <a href={"/posters/screenshot" + question.id + ".png"}>
              <button className={styles.button}>Share poster</button>
            </a>
            <Link to="/ask" className={styles.buttonLink}>
              <button className={styles.button}>Ask another question</button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AnswerPage;
