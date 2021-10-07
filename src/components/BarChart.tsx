import { useMemo } from "react";
import {
  Box,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from "victory";
import { Answer } from "../Interfaces";
import { getLabelWidth, tickFormat } from "../logic/measured-ticks";
import {
  chartBottomPaddingNoAxis,
  chartLeftPaddingMeasuredExtra,
  chartTitleSize,
  chartTitleY,
  chartTopPaddingNoTitle,
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

export const BarChart = ({ chart, width, height }: Props) => {
  const yLabelWidth = useMemo(
    () => getLabelWidth(chart.data, "x"),
    [chart.data],
  );
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
      <ChartCard src_label={chart.src_label}>
        <VictoryChart
          width={width}
          height={height}
          domainPadding={{ x: 25 }}
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
            y={chartTitleY}
            textAnchor="middle"
            text={chart.graph_label}
            style={{ fontSize: chartTitleSize }}
          />
          <VictoryBar
            height={300}
            data={chart.data}
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
