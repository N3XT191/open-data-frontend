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

  const yLabelWidth = useMemo(() => getLabelWidth(data, "y"), [data]);

  return (
    <CenteredLayout>
      <ChartCard>
        <VictoryChart
          width={width}
          height={height}
          scale={{ x: chart.x_axis_time ? "time" : undefined }}
          padding={{
            ...defaultChartPadding,
            left: yLabelWidth ? yLabelWidth + 20 : defaultChartPadding.left,
            top: chart.graph_label?.trim().length
              ? defaultChartPadding.top
              : chartTopPaddingNoTitle,
            bottom: chart.hide_x_axis
              ? chartBottomPaddingNoAxis
              : defaultChartPadding.top,
          }}
        >
          <VictoryLabel
            x={225}
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
