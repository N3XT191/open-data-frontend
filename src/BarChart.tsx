import { useMemo } from "react";
import {
  Box,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from "victory";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";
import { Answer } from "./Interfaces";
import { getLabelWidth, tickFormat } from "./measured-ticks";
import {
  chartBottomPaddingNoAxis,
  chartLeftPaddingMeasuredExtra,
  chartTopPaddingNoTitle,
  customTheme,
  defaultChartPadding,
  dotsBackgroundDefs,
  dotsBackgroundStyle,
} from "./victory-theme";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}

const BarChart: React.FC<Props> = ({ chart, width, height }) => {
  const yLabelWidth = useMemo(() => getLabelWidth(chart.data, "x"), [
    chart.data,
  ]);
  const padding = {
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
  };
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
              : defaultChartPadding.bottom,
          }}
        >
          {dotsBackgroundDefs}
          <Box
            style={{
              ...dotsBackgroundStyle,
              width: width - padding.left - padding.right,
              height: height - padding.top - padding.bottom,
              x: padding.left,
              y: padding.top,
            }}
          />
          <VictoryLabel
            x={width / 2}
            y={25}
            textAnchor="middle"
            text={chart.graph_label}
            style={{ fontSize: 25 }}
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
