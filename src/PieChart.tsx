import { Answer } from "./Interfaces";
import { VictoryLabel, VictoryPie } from "victory";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";

interface Props {
	chart: Answer;
	width: number;
	height: number;
}
const PieChart: React.FC<Props> = ({ chart, width, height }) => {
	return (
		<CenteredLayout>
			<ChartCard>
				<VictoryPie
					width={width}
					height={height}
					colorScale="qualitative"
					data={chart.data}
				>
					<VictoryLabel
						text={`3pt Attempts Per Game Averages`}
						textAnchor="middle"
						style={{ fill: "#aaa", fontSize: 16 }}
					/>
				</VictoryPie>
			</ChartCard>
		</CenteredLayout>
	);
};
export default PieChart;
