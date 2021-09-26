import { Answer } from "./Interfaces";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
} from "victory";
import { ChartCard } from "./ChartCard";
import { CenteredLayout } from "./CenteredLayout";
import { useMemo } from "react";
import { getLabelWidth, tickFormat } from "./measured-ticks";
import {
  defaultChartPadding,
  chartTopPaddingNoTitle,
  chartBottomPaddingNoAxis,
  chartLeftPaddingMeasuredExtra,
  customTheme,
  dotsBackgroundStyle,
  dotsBackgroundDefs,
  chartTitleSize,
  chartTitleY,
} from "./victory-theme";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}

const LineChart: React.FC<Props> = ({ chart, width, height }) => {
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
              Math.max(...chart.data.map((e: any) => e.y as number))
            ),
          },
        ],
        "y"
      ),
    [chart.data]
  );

  return (
    <CenteredLayout>
      <ChartCard>
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
              style={{ data: { fill: "#ccc" } }}
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
export default LineChart;
