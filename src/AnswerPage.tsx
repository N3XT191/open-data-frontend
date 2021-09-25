import { useEffect, useState } from "react";
import { askQuestion } from "./api";
import Chart from "./Chart";
import { Answer, Question } from "./Interfaces";

interface Props {
  question: Question | undefined;
  unselectQuestion: () => void;
}
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
      <div style={{ fontSize: 45, fontWeight: 500, margin: 50 }}>
        {question?.text}
      </div>
      {answer ? <Chart chart={answer} /> : <div>loading...</div>}
    </>
  );
};

export default AnswerPage;
