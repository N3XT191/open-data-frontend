import { AnimateSharedLayout, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AnswerPage } from "./components/AnswerPage";
import { Background } from "./components/Background";
import { QuestionSelector } from "./components/QuestionSelector";
import { Question } from "./Interfaces";
import { getQuestions } from "./logic/api";
import { roughTokenize } from "./logic/search";
import { useWindowSize } from "./logic/use-window-size";

export const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data: Omit<Question, "usefulWordCount">[] = await getQuestions();
      setQuestions(
        data.map((q) => ({
          ...q,
          usefulWordCount: roughTokenize(q.text, undefined).length,
        })),
      );
    };
    getData();
  }, []);

  const windowSize = useWindowSize();

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
                  (q) => q.id === +routeProps.match.params.q,
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
};
