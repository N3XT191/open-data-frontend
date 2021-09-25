import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";
import { Answer } from "./Interfaces";

interface Props {
	chart: Answer;
	width: number;
	height: number;
}

const NumberChart: React.FC<Props> = ({ chart, width, height }) => {
	return (
		<CenteredLayout>
			<ChartCard>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						fontSize: 45,
						paddingTop: 100,
						paddingBottom: 100,
					}}
				>
					{chart.data[0].y}
				</div>
			</ChartCard>
		</CenteredLayout>
	);
};
export default NumberChart;
