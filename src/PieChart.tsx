import { Answer } from "./Interfaces";
import { VictoryPie } from "victory";

interface Props {
	chart: Answer;
}
const PieChart: React.FC<Props> = ({ chart }) => {
	return (
		<VictoryPie
			colorScale="qualitative"
			data={[
				{ x: "yes", y: 52 },
				{ x: "no", y: 23 },
			]}
		/>
	);
};
export default PieChart;
