import { Answer } from "./Interfaces";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";

interface Props {
  chart: Answer;
}

const BarChart: React.FC<Props> = ({ chart }) => {
  console.log(chart.data.map((v: any) => v));
  return (
    <CenteredLayout>
      <ChartCard>
        <VictoryChart domainPadding={25}>
          <VictoryLabel
            x={225}
            y={25}
            textAnchor="middle"
            text={chart.graph_label}
          />
          <VictoryBar
            height={300}
            data={chart.data}
            style={{
              data: { fill: "#c43a31" },
            }}
            categories={{ x: chart.data.map((v: any) => v.x) }}
            horizontal={true}
          ></VictoryBar>
          <VictoryAxis />
          <VictoryAxis dependentAxis={true} />
        </VictoryChart>
      </ChartCard>
    </CenteredLayout>
  );
};
export default BarChart;
