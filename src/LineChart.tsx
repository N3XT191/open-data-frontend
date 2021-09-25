import { Answer } from "./Interfaces";
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from "victory";
import { ChartCard } from "./ChartCard";
import { CenteredLayout } from "./CenteredLayout";
import { useMemo } from "react";
import { getLabelWidth, tickFormat } from "./measured-ticks";
import {
  defaultChartPadding,
  chartTopPaddingNoTitle,
  chartBottomPaddingNoAxis,
} from "./victory-theme";
import { last } from "lodash";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}

const LineChart: React.FC<Props> = ({ chart, width, height }) => {
  const data = useMemo(() => {
    if (chart.x_axis_time) {
      return chart.data.map((point: any) => {
        return {
          y: point.y,
          x: new Date(point.x),
        };
      });
    } else {
      return chart.data;
    }
  }, [chart]);

  const yLabelWidth = useMemo(
    () =>
      getLabelWidth(
        [
          { y: Math.round(chart.data[0].y) },
          { y: Math.round(last<any>(chart.data).y) },
        ],
        "x"
      ),
    [chart.data]
  );

  return (
    <CenteredLayout>
      <ChartCard>
        <VictoryChart
          width={width}
          height={height}
          scale={{ x: chart.x_axis_time ? "time" : undefined }}
          padding={{
            ...defaultChartPadding,
            left: yLabelWidth ? yLabelWidth : defaultChartPadding.left,
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

          <VictoryLine
            interpolation={"basis"}
            data={data}
            style={{ data: { stroke: "#E00414", strokeWidth: 1 } }}
          />

          <VictoryAxis />
          <VictoryAxis tickFormat={tickFormat} dependentAxis={true} />
        </VictoryChart>
      </ChartCard>
    </CenteredLayout>
  );
};
export default LineChart;
