import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";
import { Answer } from "./Interfaces";

interface Props {
	chart: Answer;
	width: number;
	height: number;
}

const tdStyle = {
	border: "1px solid #999",
	padding: "1.0rem 2.5rem",
};
const TableChart: React.FC<Props> = ({ chart, width, height }) => {
	return (
		<CenteredLayout>
			<ChartCard>
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						fontSize: 25,
					}}
				>
					<table style={{ borderCollapse: "collapse" }}>
						<thead style={{ backgroundColor: "#743fca", color: "white" }}>
							<td style={tdStyle}>Pollutant</td>
							<td style={tdStyle}>Value</td>
						</thead>
						<tbody>
							{Object.keys(chart.data.values).map((v: any) => (
								<tr>
									<td style={tdStyle}>{v}</td>
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
export default TableChart;
