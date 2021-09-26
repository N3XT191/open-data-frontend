import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { askQuestion } from "./api";
import Chart from "./Chart";
import { Answer, Question } from "./Interfaces";
import { colors } from "./victory-theme";
import { QuestionText } from "./QuestionText";

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
  `,
  mainBody: css`
    height: calc(100% - 280px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
};

const AnswerPage: React.FC<Props> = ({ question, windowSize }) => {
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
        <QuestionText text={question.text} windowSize={windowSize} />
      </div>
      <div className={styles.mainBody}>
        {answer ? (
          <Chart chart={answer} windowSize={windowSize} />
        ) : (
          <div>loading...</div>
        )}
        <div className={styles.toolbar}>
          <button className={styles.button}>Share</button>
          <Link to="/ask">
            <button className={styles.button}>Ask another question</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnswerPage;
