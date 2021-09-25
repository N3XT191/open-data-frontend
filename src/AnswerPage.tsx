import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { askQuestion } from "./api";
import Chart from "./Chart";
import { Answer, Question } from "./Interfaces";

interface Props {
	question: Question | undefined;
}

const styles = {
	question: css`
		font-size: 45px;
		font-weight: 500;
		margin: 50px;
		margin-right: 150px;
		@media (max-width: 900px) {
			font-size: 30px;
			margin: 20px;
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
		background: #743fca;
		margin: 10px 10px;
		padding: 15px 30px;
		font-size: 18px;
		color: white;
		cursor: pointer;
	`,
};

function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState<{
		width: number;
		height: number;
	}>();
	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		// Add event listener
		window.addEventListener("resize", handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
}

const AnswerPage: React.FC<Props> = ({ question }) => {
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

	const windowSize = useWindowSize();

	return (
		<>
			<div className={styles.question}>{question?.text}</div>
			{answer && windowSize ? (
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
		</>
	);
};

export default AnswerPage;
