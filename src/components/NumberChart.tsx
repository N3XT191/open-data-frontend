import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";
import { Answer } from "../Interfaces";
import { colors } from "../victory-theme";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}

const NumberChart: React.FC<Props> = ({ chart, width, height }) => {
  return (
    <CenteredLayout>
      <ChartCard>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 65,
            margin: 60,
            color: colors[1],
            fontWeight: 600,
          }}
        >
          {chart.data[0].y}
        </div>
      </ChartCard>
    </CenteredLayout>
  );
};
export default NumberChart;
