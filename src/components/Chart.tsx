import { Answer } from "../Interfaces";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { MapChart } from "./MapChart";
import { MultiLineChart } from "./MultiLineChart";
import { NumberChart } from "./NumberChart";
import { PieChart } from "./PieChart";
import { TableChart } from "./TableChart";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}

export const Chart = ({ chart, width, height }: Props) => {
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
