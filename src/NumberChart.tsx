import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";
import { Answer } from "./Interfaces";

interface Props {
	chart: Answer;
}

const NumberChart: React.FC<Props> = ({ chart }) => {
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
