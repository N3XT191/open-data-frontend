import { css } from "@emotion/css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { readBuilderProgram } from "typescript";
import { askQuestion } from "./api";
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

  useEffect(() => {
    const getData = async () => {
      setAnswer(undefined);
      if (question) {
        const answer_data = await askQuestion(question.id);
        setAnswer(answer_data);
      }
    };
    getData();
  }, [question]);

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
          <Chart chart={answer} windowSize={windowSize} />
        ) : (
          <div>loading...</div>
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
