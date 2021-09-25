import { Answer } from "./Interfaces";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";
import {
  chartTopPaddingNoTitle,
  customTheme,
  defaultChartPadding,
} from "./victory-theme";
import { textMeasurementCaches } from "./text-measurement";
import { useMemo } from "react";

interface Props {
  chart: Answer;
}

function isEvery<A, B extends A>(data: A[], cb: (v: A) => v is B): data is B[] {
  return data.every((e) => cb(e));
}

function getYLabelWidth(chartData: unknown[]): number | undefined {
  function isMeasurable(entry: unknown): entry is { x: string } {
    return (
      !!entry &&
      typeof entry === "object" &&
      typeof (entry as any).x === "string"
    );
  }

  if (!chartData.length || !isEvery(chartData, isMeasurable)) {
    return undefined;
  }

  return Math.max(
    ...chartData.map((e) => textMeasurementCaches.plotLabel.measure(e.x).width)
  );
}

const BarChart: React.FC<Props> = ({ chart }) => {
  const yLabelWidth = useMemo(() => getYLabelWidth(chart.data), [chart.data]);
  return (
    <CenteredLayout>
      <ChartCard>
        <VictoryChart
          domainPadding={25}
          theme={customTheme}
          padding={{
            ...defaultChartPadding,
            left: yLabelWidth ? yLabelWidth + 20 : defaultChartPadding.left,
            top: chart.graph_label?.trim().length
              ? defaultChartPadding.top
              : chartTopPaddingNoTitle,
          }}
        >
          <VictoryLabel
            x={225}
            y={25}
            textAnchor="middle"
            text={chart.graph_label}
          />
          <VictoryBar
            height={300}
            data={chart.data}
            style={{
              data: { fill: "#c43a31" },
            }}
            categories={{ x: chart.data.map((v: any) => v.x) }}
            horizontal={true}
          ></VictoryBar>
          <VictoryAxis />
          <VictoryAxis dependentAxis={true} />
        </VictoryChart>
      </ChartCard>
    </CenteredLayout>
  );
};
export default BarChart;
