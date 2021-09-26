import { Answer } from "./Interfaces";
import { VictoryPie } from "victory";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";
import { colors } from "./victory-theme";

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
          colorScale={colors.slice(1)}
          data={chart.data}
          labelRadius={Math.min(width, height) / 3.5}
          style={{ labels: { fill: "white", fontSize: 35 } }}
        ></VictoryPie>
      </ChartCard>
    </CenteredLayout>
  );
};
export default PieChart;
