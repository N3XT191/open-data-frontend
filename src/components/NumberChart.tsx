import { Answer } from "../Interfaces";
import { colors } from "../victory-theme";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}

export const NumberChart = ({ chart }: Props) => {
  return (
    <CenteredLayout>
      <ChartCard sourceUrl={chart.src_url} sourceLabel={chart.src_label}>
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
