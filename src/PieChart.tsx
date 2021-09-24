import { Answer } from "./Interfaces";
import { VictoryLabel, VictoryPie } from "victory";

interface Props {
	chart: Answer;
}
const PieChart: React.FC<Props> = ({ chart }) => {
	return (
		<VictoryPie
			height={300}
			colorScale="qualitative"
			data={[
				{ x: "yes", y: 52 },
				{ x: "no", y: 23 },
			]}
		>
			<VictoryLabel
				text={`3pt Attempts Per Game Averages`}
				textAnchor="middle"
				style={{ fill: "#aaa", fontSize: 16 }}
			/>
		</VictoryPie>
	);
};
export default PieChart;
