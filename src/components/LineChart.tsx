import { useMemo } from "react";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
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

export const LineChart = ({ chart, width, height }: Props) => {
  const data = useMemo(() => {
    if (chart.x_axis_time) {
      return chart.data.map((point: any) => ({
        ...point,
        x: new Date(point.x),
      }));
    } else {
      return chart.data;
    }
  }, [chart]);

  const yLabelWidth = useMemo(
    () =>
      getLabelWidth(
        [
          {
            y: Math.round(
              Math.max(...chart.data.map((e: any) => e.y as number)),
            ),
          },
        ],
        "y",
      ),
    [chart.data],
  );

  return (
    <CenteredLayout>
      <ChartCard sourceUrl={chart.src_url} sourceLabel={chart.src_label}>
        <VictoryChart
          width={width}
          height={height}
          domainPadding={chart.domain_padding}
          scale={{ x: chart.x_axis_time ? "time" : undefined }}
          theme={customTheme}
          style={{ background: dotsBackgroundStyle }}
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

          <VictoryLabel
            x={width / 2}
            y={chartTitleY}
            textAnchor="middle"
            text={chart.graph_label}
            style={{ fontSize: chartTitleSize }}
          />

          {data[0]?.y_low !== undefined && (
            <VictoryArea
              data={data.map((e: any) => ({
                x: e.x,
                y0: e.y_low,
                y: e.y_high,
              }))}
            />
          )}
          <VictoryLine data={data} />

          <VictoryAxis
            tickFormat={chart.x_axis_hours ? (a) => a + ":00" : undefined}
          />
          <VictoryAxis tickFormat={tickFormat} dependentAxis={true} />
        </VictoryChart>
      </ChartCard>
    </CenteredLayout>
  );
};
