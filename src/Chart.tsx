import { useEffect, useState } from "react";
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
}
function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState<{
		width: number | undefined;
		height: number | undefined;
	}>({
		width: undefined,
		height: undefined,
	});
	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		// Add event listener
		window.addEventListener("resize", handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
}

const Chart: React.FC<Props> = ({ chart }) => {
	const size = useWindowSize();

	const maxWidth = 800;
	const minWidth = 300;
	const width = size.width
		? Math.min(Math.max(size.width - 400, minWidth), maxWidth)
		: minWidth;

	const maxHeight = 800;
	const minHeight = 300;
	const height = size.height
		? Math.min(Math.max(size.height - 300, minHeight), maxHeight)
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
		return <MapChart chart={chart} width={width} height={height} />;
	} else if (chart.chart_type === "number") {
		return <NumberChart chart={chart} width={width} height={height} />;
	}
	return <>I don't know chart_type: {chart.chart_type}</>;
};
export default Chart;
