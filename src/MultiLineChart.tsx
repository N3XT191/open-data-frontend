import { Answer } from "./Interfaces";
import {
	VictoryAxis,
	VictoryChart,
	VictoryLabel,
	VictoryLegend,
	VictoryLine,
} from "victory";

interface Props {
	chart: Answer;
}
const colors = [
	"#2965CC",
	"#29A634",
	"#D99E0B",
	"#D13913",
	"#8F398F",
	"#00B3A4",
	"#DB2C6F",
	"#9BBF30",
	"#96622D",
	"#7157D9",
];
const MultiLineChart: React.FC<Props> = ({ chart }) => {
	const keys = Object.keys(chart.data[0]);

	return (
		<VictoryChart height={300}>
			<VictoryLabel
				x={225}
				y={10}
				textAnchor="middle"
				text={chart.graph_label}
			/>

			<VictoryAxis crossAxis={true} style={{ ticks: { stroke: "" } }} />
			<VictoryLegend
				y={30}
				x={100}
				centerTitle
				orientation="horizontal"
				gutter={10}
				style={{
					border: { stroke: "black" },
					title: { fontSize: 5 },
					labels: { fontSize: 6 },
				}}
				data={keys.slice(1).map((key, i) => {
					return { name: key, symbol: { fill: colors[i] } };
				})}
			/>
			{keys.slice(1).map((key: any, i: number) => (
				<VictoryLine
					interpolation={"basis"}
					data={chart.data.map((point: any) => {
						return { x: point.day_of_year, y: point[key] };
					})}
					style={{ data: { stroke: colors[i], strokeWidth: 1.5 } }}
				/>
			))}
		</VictoryChart>
	);
};
export default MultiLineChart;
