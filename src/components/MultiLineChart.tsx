import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
} from "victory";
import { Answer } from "../Interfaces";
import {
  chartTitleSize,
  chartTitleY,
  colors as globalColors,
  customTheme,
  defaultChartPadding,
  dotsBackgroundDefs,
  dotsBackgroundStyle,
} from "../victory-theme";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}
const colors = [globalColors[1], globalColors[0], globalColors[2]];
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
          theme={customTheme}
          style={{ background: dotsBackgroundStyle }}
          padding={{
            ...defaultChartPadding,
            top: defaultChartPadding.top + 60,
          }}
        >
          {dotsBackgroundDefs}

          <VictoryLabel
            x={width / 2}
            y={chartTitleY}
            textAnchor="middle"
            text={chart.graph_label}
            style={{ fontSize: chartTitleSize }}
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
            y={defaultChartPadding.top - 5}
            x={width / 2 - 120}
            orientation="horizontal"
            gutter={40}
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
              style={{ data: { stroke: colors[i] } }}
            />
          ))}
        </VictoryChart>
      </ChartCard>
    </CenteredLayout>
  );
};
export default MultiLineChart;
