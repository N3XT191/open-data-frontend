import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { askQuestion } from "./api";
import Chart from "./Chart";
import { Answer, Question } from "./Interfaces";

interface Props {
  question: Question | undefined;
  unselectQuestion: () => void;
}

const styles = {
  question: css`
    font-size: 45px;
    font-weight: 500;
    margin: 50px;

    @media (max-width: 900px) {
      font-size: 30px;
      margin: 20px;
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
    background: #743fca;
    margin: 10px 10px;
    padding: 15px 30px;
    font-size: 18px;
    color: white;
  `,
};

const AnswerPage: React.FC<Props> = ({ question, unselectQuestion }) => {
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
    <>
      <div className={styles.question}>{question?.text}</div>
      {answer ? <Chart chart={answer} /> : <div>loading...</div>}
      <div className={styles.toolbar}>
        <button className={styles.button}>Share</button>
        <button className={styles.button} onClick={unselectQuestion}>
          Ask another question
        </button>
      </div>
    </>
  );
};

export default AnswerPage;
