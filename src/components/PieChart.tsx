import { VictoryPie } from "victory";
import { Answer } from "../Interfaces";
import { colors } from "../victory-theme";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}

export const PieChart = ({ chart, width, height }: Props) => {
  return (
    <CenteredLayout>
      <ChartCard src_label={chart.src_label}>
        <VictoryPie
          width={width}
          height={height}
          colorScale={[colors[1], colors[0]]}
          data={chart.data}
          labelRadius={Math.min(width, height) / 3.5}
          style={{ labels: { fill: "white", fontSize: 35 } }}
        ></VictoryPie>
      </ChartCard>
    </CenteredLayout>
  );
};
