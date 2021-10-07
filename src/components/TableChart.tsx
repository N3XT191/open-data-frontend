import { Answer } from "../Interfaces";
import { colors } from "../victory-theme";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";

interface Props {
  chart: Answer;
  width: number;
  height: number;
}

const tdStyle = {
  border: "1px solid #999",
  padding: "1.0rem 2.5rem",
};
const units = [
  {
    ID: "CO",
    Einheit: "mg/m3",
  },
  {
    ID: "SO2",
    Einheit: "µg/m3",
  },
  {
    ID: "O3",
    Einheit: "µg/m3",
  },
  {
    ID: "NOx",
    Einheit: "ppb",
  },
  {
    ID: "NO",
    Einheit: "µg/m3",
  },
  {
    ID: "NO2",
    Einheit: "µg/m3",
  },
  {
    ID: "PM10",
    Einheit: "µg/m3",
  },
  {
    ID: "PM2.5",
    Einheit: "µg/m3",
  },
];

export const TableChart = ({ chart }: Props) => {
  return (
    <CenteredLayout>
      <ChartCard src_label={chart.src_label}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 24,
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 27, padding: 25 }}>{chart.graph_label}</div>
          <table style={{ borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: colors[1], color: "white" }}>
              <td style={tdStyle}>Pollutant</td>
              <td style={tdStyle}>Value</td>
            </thead>
            <tbody>
              {Object.keys(chart.data.values).map((v: any) => (
                <tr>
                  <td style={tdStyle}>
                    {v}
                    {" in [" +
                      units.find((u: any) => u.ID === v)?.Einheit +
                      "]"}
                  </td>
                  <td style={tdStyle}>
                    {Math.floor(chart.data.values[v] * 100) / 100}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </CenteredLayout>
  );
};
