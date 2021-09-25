import { useEffect, useState } from "react";
import AnswerPage from "./AnswerPage";
import { chartSettings, getQuestions } from "./api";
import { Question } from "./Interfaces";
import QuestionSelector from "./QuestionSelector";
import { Background } from "./Background";
import { shuffle } from "lodash";

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

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "r" && ev.ctrlKey) {
        ev.preventDefault();
        ev.stopPropagation();

        setSelectedQuestion(
          shuffle(
            chartSettings.filter(
              (s) => s.id !== selectedQuestion && s.chart_type === "bar"
            )
          )[0]?.id
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

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
