import { useEffect, useState } from "react";
import AnswerPage from "./AnswerPage";
import { getQuestions } from "./api";
import { Question } from "./Interfaces";
import QuestionSelector from "./QuestionSelector";
import { Background } from "./Background";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const [selectedQuestion, setSelectedQuestion] = useState<
    number | undefined
  >();

  useEffect(() => {
    const getData = async () => {
      const data = await getQuestions();
      setQuestions(data);
    };
    getData();
  }, []);

  return (
    <>
      {selectedQuestion ? (
        <AnswerPage
          question={questions.find((q) => q.id === selectedQuestion)}
          unselectQuestion={() => setSelectedQuestion(undefined)}
        />
      ) : (
        <QuestionSelector
          questions={questions}
          onSelect={async (id) => {
            setSelectedQuestion(id);
          }}
        />
      )}
      <Background />
    </>
  );
}

export default App;
