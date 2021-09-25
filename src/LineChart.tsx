import { Answer } from "./Interfaces";
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from "victory";

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
				x={225}
				y={25}
				textAnchor="middle"
				text={chart.graph_label}
			/>
			<VictoryAxis crossAxis={true} style={{ tickLabels: { fill: "none" } }} />
			<VictoryAxis
				dependentAxis={true}
				style={{ tickLabels: { fill: "none" } }}
			/>
			<VictoryLine
				interpolation={"basis"}
				data={data}
				style={{ data: { stroke: "#E00414", strokeWidth: 1 } }}
			/>
		</VictoryChart>
	);
};
export default LineChart;
