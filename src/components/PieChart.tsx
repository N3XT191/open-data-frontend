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
const PieChart: React.FC<Props> = ({ chart, width, height }) => {
  return (
    <CenteredLayout>
      <ChartCard>
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
export default PieChart;
