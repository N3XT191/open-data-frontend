import BarChart from "./BarChart";
import { Answer } from "./Interfaces";
import LineChart from "./LineChart";
import MapChart from "./MapChart";
import MultiLineChart from "./MultiLineChart";
import NumberChart from "./NumberChart";
import PieChart from "./PieChart";
import TableChart from "./TableChart";

interface Props {
	chart: Answer;
	windowSize: { width: number; height: number };
}

const Chart: React.FC<Props> = ({ chart, windowSize }) => {
	const maxWidth = 800;
	const minWidth = 300;
	const width = windowSize.width
		? Math.min(Math.max(windowSize.width - 400, minWidth), maxWidth)
		: minWidth;

	const maxHeight = 800;
	const minHeight = 300;
	const height = windowSize.height
		? Math.min(Math.max(windowSize.height - 350, minHeight), maxHeight)
		: minHeight;

	if (chart.chart_type === "line") {
		return <LineChart chart={chart} width={width} height={height} />;
	} else if (chart.chart_type === "multi-line") {
		return <MultiLineChart chart={chart} width={width} height={height} />;
	} else if (chart.chart_type === "pie") {
		return <PieChart chart={chart} width={width} height={height} />;
	} else if (chart.chart_type === "bar") {
		return <BarChart chart={chart} width={width} height={height} />;
	} else if (chart.chart_type === "table") {
		return <TableChart chart={chart} width={width} height={height} />;
	} else if (chart.chart_type === "map") {
		return <MapChart chart={chart} width={width * 0.8} height={height * 0.8} />;
	} else if (chart.chart_type === "number") {
		return <NumberChart chart={chart} width={width} height={height} />;
	}
	return <>I don't know chart_type: {chart.chart_type}</>;
};
export default Chart;
