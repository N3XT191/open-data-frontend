import { Answer } from "./Interfaces";
import { VictoryChart, VictoryLabel, VictoryLine } from "victory";

interface Props {
	chart: Answer;
}
const LineChart: React.FC<Props> = ({ chart }) => {
	let data;
	if (chart.x_axis_time) {
		data = chart.data.map((point: any) => {
			return {
				y: point.y,
				x: new Date(point.x),
			};
		});
	} else {
		data = chart.data;
	}

	return (
		<VictoryChart height={300} scale={{ x: "time" }}>
			<VictoryLabel
				text={chart.graph_title}
				textAnchor="middle"
				style={{ fill: "#aaa", fontSize: 10 }}
			/>
			<VictoryLine
				interpolation={"linear"}
				data={data}
				style={{ data: { stroke: "#c43a31" } }}
			/>
		</VictoryChart>
	);
};
export default LineChart;
