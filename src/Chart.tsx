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

const Chart: React.FC<Props> = ({ chart }) => {
  if (chart.chart_type === "line") {
    return <LineChart chart={chart} />;
  } else if (chart.chart_type === "multi-line") {
    return <MultiLineChart chart={chart} />;
  } else if (chart.chart_type === "pie") {
    return <PieChart chart={chart} />;
  } else if (chart.chart_type === "bar") {
    return <BarChart chart={chart} />;
  } else if (chart.chart_type === "table") {
    return <TableChart chart={chart} />;
  } else if (chart.chart_type === "map") {
    return <MapChart chart={chart} />;
  } else if (chart.chart_type === "number") {
    return <NumberChart chart={chart} />;
  }
  return <>I don't know chart_type: {chart.chart_type}</>;
};
export default Chart;
