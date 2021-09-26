import { AnimateSharedLayout, motion } from "framer-motion";
import { groupBy, shuffle } from "lodash";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import AnswerPage from "./AnswerPage";
import AnswerPagePoster from "./AnswerPagePoster";
import { chartSettings, getQuestions } from "./api";
import Background from "./Background";
import { Question } from "./Interfaces";
import QuestionSelector from "./QuestionSelector";
import { useWindowSize } from "./use-window-size";

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

  const windowSize = useWindowSize();

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "r" && (ev.altKey || ev.ctrlKey)) {
        ev.preventDefault();
        ev.stopPropagation();

        type Entry = typeof chartSettings[number];
        type FilterCb = (e: Entry) => boolean;
        const pickTypeThenChart = (cb: FilterCb): Entry | undefined => {
          return shuffle(
            shuffle([
              ...Object.values(
                groupBy(
                  chartSettings.filter((s) => true),
                  (e) => e.chart_type
                )
              ),
            ])[0] || []
          )[0];
        };
        const pickChart = (cb: FilterCb): Entry | undefined => {
          return shuffle(chartSettings.filter((s) => true))[0];
        };

        history.push("/ask/" + pickTypeThenChart((e) => true)?.id);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  if (!windowSize) {
    return null;
  }

  return (
    <>
      <AnimateSharedLayout type="crossfade">
        <div style={{ height: "100%" }}>
          <Switch>
            <Route
              exact={true}
              path="/ask/:q"
              render={(routeProps) => {
                const question = questions.find(
                  (q) => q.id === +routeProps.match.params.q
                );
                return (
                  question && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <AnswerPage question={question} windowSize={windowSize} />
                    </motion.div>
                  )
                );
              }}
            ></Route>
            <Route
              exact={true}
              path="/poster/:q"
              render={(routeProps) => {
                const question = questions.find(
                  (q) => q.id === +routeProps.match.params.q
                );
                return (
                  question && (
                    <AnswerPagePoster
                      question={question}
                      windowSize={windowSize}
                    />
                  )
                );
              }}
            ></Route>
            <Route exact={true} path="/ask">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 200 }}
              >
                <QuestionSelector
                  questions={questions}
                  windowSize={windowSize}
                />
              </motion.div>
            </Route>
            <Redirect to="/ask" />
          </Switch>
        </div>
      </AnimateSharedLayout>
      <Background windowSize={windowSize} />
    </>
  );
}

export default App;
