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
		margin-top: 0;
		padding-top: 50px;
		margin-right: 150px;
		margin-bottom: 20px;
		@media (max-width: 900px) {
			font-size: 30px;
			margin: 20px;
			margin-top: 0;
			padding-top: 20px;
			margin-right: 150px;
		}
	`,
	subtitle: css`
		font-size: 30px;
		font-weight: 300;
		margin: 50px;
		margin-top: 10px;
		color: grey;
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
		display: none;
	`,
	mainBody: css`
		height: calc(100% - 450px);
		display: flex;
		flex-direction: column;
		justify-content: center;
	`,
	botRightBox: css`
		height: 180px;
		width: 600px;
		position: absolute;
		bottom: 50px;
		right: 0;
		background-color: #585759;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40px;
		padding: 0px;
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

const names = ["Philippe", "Marc"];
const times = [
	"today",
	"this morning",
	"yesterday",
	"yesterday evening",
	"yesterday night",
	"yesterday morning",
	"on Friday",
	"Friday night",
];

const AnswerPagePoster: React.FC<Props> = ({ question }) => {
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
	const randomName = names[Math.floor(Math.random() * names.length)];
	const randomTime = times[Math.floor(Math.random() * times.length)];

	return (
		<div style={{ height: "100%", display: "relative" }}>
			<div className={styles.question}>{question?.text}</div>
			<div
				className={styles.subtitle}
			>{`Asked at Hackzurich, ${randomTime}, by ${randomName}`}</div>
			<div className={styles.mainBody}>
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
			</div>
			<div className={styles.botRightBox}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "end",
						alignItems: "end",
						marginRight: "20px",
					}}
				>
					<div>
						What would <i>you</i> ask?
					</div>
					<div>
						<b>ask-open-data.ch</b>
					</div>
				</div>
				<img
					src="/qrcode.svg"
					alt=""
					style={{ boxSizing: "border-box", height: "80%" }}
				/>
			</div>
		</div>
	);
};

export default AnswerPagePoster;
