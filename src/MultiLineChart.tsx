import { Answer } from "./Interfaces";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
} from "victory";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";
import {
  chartTitleSize,
  chartTitleY,
  chartTopPaddingNoTitle,
  defaultChartPadding,
} from "./victory-theme";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}
const colors = [
  "#2965CC",
  "#29A634",
  "#D99E0B",
  "#D13913",
  "#8F398F",
  "#00B3A4",
  "#DB2C6F",
  "#9BBF30",
  "#96622D",
  "#7157D9",
];
const MultiLineChart: React.FC<Props> = ({ chart, width, height }) => {
  const keys = Object.keys(chart.data[0]);
  const monthTicks = {
    31: "Feb",
    90: "Apr",
    151: "Jun",
    212: "Aug",
    273: "Okt",
    334: "Dez",
  } as any;

  return (
    <CenteredLayout>
      <ChartCard>
        <VictoryChart
          width={width}
          height={height}
          padding={{
            ...defaultChartPadding,
            top:
              50 +
              (chart.graph_label?.trim().length
                ? defaultChartPadding.top
                : chartTopPaddingNoTitle),
          }}
        >
          <VictoryLabel
            x={width / 2}
            y={chartTitleY}
            textAnchor="middle"
            text={chart.graph_label}
            style={{ fontSize: chartTitleSize, paddingBottom: 50 }}
          />

          <VictoryAxis
            crossAxis={true}
            style={{ ticks: { stroke: "" } }}
            tickValues={
              chart.x_axis_hours
                ? [2, 6, 10, 14, 18, 22]
                : [31, 90, 151, 212, 273, 334]
            }
            tickFormat={
              chart.x_axis_hours ? (t) => t + ":00" : (t) => monthTicks[t]
            }
          />

          <VictoryLegend
            y={50}
            x={width / 2 - 110}
            centerTitle
            orientation="horizontal"
            gutter={30}
            style={{
              border: { stroke: "black" },
              labels: { fontSize: 20 },
            }}
            data={keys.slice(1).map((key, i) => {
              return { name: key, symbol: { fill: colors[i] } };
            })}
          />
          {keys.slice(1).map((key: any, i: number) => (
            <VictoryLine
              interpolation={"basis"}
              data={chart.data.map((point: any) => {
                return { x: point.day_of_year, y: point[key] };
              })}
              style={{ data: { stroke: colors[i], strokeWidth: 1.5 } }}
            />
          ))}
        </VictoryChart>
      </ChartCard>
    </CenteredLayout>
  );
};
export default MultiLineChart;
