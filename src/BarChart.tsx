import { Answer } from "./Interfaces";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";
import {
  chartBottomPaddingNoAxis,
  chartLeftPaddingMeasuredExtra,
  chartTopPaddingNoTitle,
  customTheme,
  defaultChartPadding,
} from "./victory-theme";
import { useMemo } from "react";
import { tickFormat, getLabelWidth } from "./measured-ticks";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}

const BarChart: React.FC<Props> = ({ chart, width, height }) => {
  const yLabelWidth = useMemo(() => getLabelWidth(chart.data, "x"), [
    chart.data,
  ]);
  return (
    <CenteredLayout>
      <ChartCard>
        <VictoryChart
          width={width}
          height={height}
          domainPadding={25}
          theme={customTheme}
          padding={{
            ...defaultChartPadding,
            left: yLabelWidth
              ? yLabelWidth + chartLeftPaddingMeasuredExtra
              : defaultChartPadding.left,
            top: chart.graph_label?.trim().length
              ? defaultChartPadding.top
              : chartTopPaddingNoTitle,
            bottom: chart.hide_x_axis
              ? chartBottomPaddingNoAxis
              : defaultChartPadding.top,
          }}
        >
          <VictoryLabel
            x={width / 2}
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
          <VictoryAxis tickFormat={tickFormat} />
          {!chart.hide_x_axis && <VictoryAxis dependentAxis={true} />}
        </VictoryChart>
      </ChartCard>
    </CenteredLayout>
  );
};
export default BarChart;
