import { useEffect, useState } from "react";
import AnswerPage from "./AnswerPage";
import { chartSettings, getQuestions } from "./api";
import { Question } from "./Interfaces";
import QuestionSelector from "./QuestionSelector";
import { Background } from "./Background";
import { shuffle, groupBy } from "lodash";
import { Route, useHistory } from "react-router-dom";
import AnswerPagePoster from "./AnswerPagePoster";

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
              shuffle([
                ...Object.values(
                  groupBy(
                    chartSettings.filter((s) => s.chart_type === "bar"),
                    (e) => e.chart_type
                  )
                ),
              ])[0] || []
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
      <div style={{ height: "100%" }}>
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
        <Route
          exact={true}
          path="/poster/:q"
          render={(routeProps) => (
            <AnswerPagePoster
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
