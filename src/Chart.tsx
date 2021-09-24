import { Answer } from "./Interfaces";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

interface Props {
	chart: Answer;
}
const Chart: React.FC<Props> = ({ chart }) => {
	console.log(chart);
	if (chart.chart_type === "line") {
		return <LineChart chart={chart} />;
	} else if (chart.chart_type === "pie") {
		return <PieChart chart={chart} />;
	}
	return <>I don't know chart_type: {chart.chart_type}</>;
};
export default Chart;
