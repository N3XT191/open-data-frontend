import { Answer } from "./Interfaces";

interface Props {
	chart: Answer;
}

const tdStyle = {
	border: "1px solid #999",
	padding: "0.5rem",
};
const TableChart: React.FC<Props> = ({ chart }) => {
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				marginTop: 200,
			}}
		>
			<table style={{ borderCollapse: "collapse" }}>
				<thead>
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
	);
};
export default TableChart;
