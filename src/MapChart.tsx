import bbox from "@turf/bbox";
import { geoPath, geoTransform } from "d3-geo";
import { scaleLinear, scaleQuantile } from "d3-scale";
import React, { useState } from "react";
import { Answer } from "./Interfaces";
import geoJson from "./stadtkreise.json";

type Props = {
	chart: Answer;
};
const colors = [
	"#ffedea",
	"#ffcec5",
	"#ffad9f",
	"#ff8a75",
	"#ff5533",
	"#e2492d",
	"#be3d26",
	"#9a311f",
	"#782618",
];
const Map = ({ chart }: Props) => {
	const [activeKreis, setActiveKreis] = useState(0);
	const width = 500;
	const [minX, minY, maxX, maxY] = bbox(geoJson);
	const height = ((maxY - minY) / (maxX - minX)) * width;
	const x = scaleLinear().range([0, width]).domain([minX, maxX]);
	const y = scaleLinear().range([0, height]).domain([maxY, minY]);
	// https://bl.ocks.org/mbostock/6216797
	const projection = geoTransform({
		point: function (px: any, py: any) {
			this.stream.point(x(px), y(py));
		},
	});
	const path = geoPath().projection(projection);
	const colorScale = scaleQuantile<string>()
		.domain(chart.data.values.map((v: any) => v.value))
		.range(colors);

	const valuesWithoutCity = chart.data.values.filter(
		(v: any) => v.placeId !== 0
	);
	return (
		<>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<div style={{ fontSize: 20, opacity: activeKreis ? 1 : 0 }}>
					{activeKreis ? "Kreis " + activeKreis : "asdf"}
				</div>
				<div style={{ fontSize: 30, marginBottom: 30 }}>
					{chart.data.values.find((v: any) => v.placeId === activeKreis).value}
					{" " + chart.data.unit}
				</div>
				<div style={{ position: "relative", width: width, height }}>
					<svg
						width={width}
						height={height}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							overflow: "visible",
						}}
					>
						<defs>
							<linearGradient
								x={0}
								y={0}
								width={20}
								height={100}
								x1={0.5}
								y1={0}
								x2={0.5}
								y2={1}
								id="linear-gradient"
							>
								{[...colors].reverse().map((c, i) => (
									<stop
										offset={(i / c.length) * 100 + "%"}
										stopColor={c}
										key={i}
									/>
								))}
							</linearGradient>
						</defs>
						<rect
							x={440}
							y={10}
							width={20}
							height={100}
							fill="url(#linear-gradient)"
							stroke="black"
							strokeWidth={0.5}
						/>
						<text x={465} y={23} fill="black">
							{Math.max(...valuesWithoutCity.map((v: any) => v.value))}
						</text>
						<text x={465} y={108} fill="black">
							{Math.min(...valuesWithoutCity.map((v: any) => v.value))}
						</text>
						{geoJson.features.map((feature: any) => {
							const name = +feature.properties.name;

							const caseCount: number =
								valuesWithoutCity.find((v: any) => v.placeId === name)?.value ??
								0;
							return (
								<path
									data-tip={name}
									key={`path-${name}-${feature.properties.UUID}`}
									stroke="black"
									strokeWidth={0.25}
									d={path(feature) ?? undefined}
									fill={caseCount ? colorScale(caseCount) : "#ffffff00"}
									onMouseEnter={() => setActiveKreis(name)}
									onMouseLeave={() => setActiveKreis(0)}
								/>
							);
						})}
					</svg>
				</div>
			</div>
		</>
	);
};

export default React.memo(Map);
