import { Answer } from "./Interfaces";
import { VictoryChart, VictoryLabel, VictoryLine } from "victory";
import { ChartCard } from "./ChartCard";
import { CenteredLayout } from "./CenteredLayout";

interface Props {
	chart: Answer;
	width: number;
	height: number;
}
const LineChart: React.FC<Props> = ({ chart, width, height }) => {
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
		<CenteredLayout>
			<ChartCard>
				<VictoryChart
					width={width}
					height={height}
					scale={{ x: chart.x_axis_time ? "time" : undefined }}
				>
					<VictoryLabel
						x={225}
						y={25}
						textAnchor="middle"
						text={chart.graph_label}
					/>

					<VictoryLine
						interpolation={"basis"}
						data={data}
						style={{ data: { stroke: "#E00414", strokeWidth: 1 } }}
					/>
				</VictoryChart>
			</ChartCard>
		</CenteredLayout>
	);
};
export default LineChart;
