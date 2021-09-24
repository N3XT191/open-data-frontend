import { useEffect, useState } from "react";
import { askQuestion, getQuestions } from "./api";
import Chart from "./Chart";
import { Answer, Question } from "./Interfaces";
import QuestionSelector from "./QuestionSelector";

function App() {
	const [questions, setQuestions] = useState<Question[]>([]);

	const [selectedQuestion, setSelectedQuestion] = useState<
		number | undefined
	>();
	const [answer, setAnswer] = useState<Answer | undefined>();

	useEffect(() => {
		const getData = async () => {
			const data = await getQuestions();
			setQuestions(data);
		};
		getData();
	}, []);

	return (
		<>
			<QuestionSelector
				questions={questions}
				onSelect={async (id) => {
					console.log(id);
					setSelectedQuestion(id);
					setAnswer(undefined);
					if (id) {
						const answer_data = await askQuestion(id);
						setAnswer(answer_data);
					}
				}}
			/>
			{selectedQuestion && !answer ? "loading..." : undefined}
			{selectedQuestion && answer ? <Chart chart={answer} /> : undefined}
		</>
	);
}

export default App;
