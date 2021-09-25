import { useEffect, useState } from "react";
import AnswerPage from "./AnswerPage";
import { chartSettings, getQuestions } from "./api";
import { Question } from "./Interfaces";
import QuestionSelector from "./QuestionSelector";
import { Background } from "./Background";
import { shuffle } from "lodash";
import { Route, useHistory } from "react-router-dom";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const data = await getQuestions();
      setQuestions(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "r" && (ev.altKey || ev.ctrlKey)) {
        ev.preventDefault();
        ev.stopPropagation();

        history.push(
          "/ask/" +
            shuffle(
              chartSettings.filter((s) => s.id !== 0 && s.chart_type === "line")
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
      <div>
        <Route
          exact={true}
          path="/ask/:q"
          render={(routeProps) => (
            <AnswerPage
              question={questions.find(
                (q) => q.id === +routeProps.match.params.q
              )}
            />
          )}
        ></Route>
        <Route exact={true} path="/ask">
          <QuestionSelector questions={questions} />
        </Route>
      </div>
      <Background />
    </>
  );
}

export default App;
