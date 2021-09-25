import bbox from "@turf/bbox";
import { geoPath, geoTransform } from "d3-geo";
import { scaleLinear, scaleQuantile } from "d3-scale";
import React, { useState } from "react";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";
import { Answer } from "./Interfaces";
import geoJson from "./stadtkreise.json";
import zurisee from "./zurisee.json";

type Props = {
  chart: Answer;
};
const colors = [
  "#c8dcbc",
  "#a2c19f",
  "#81aa7f",
  "#639361",
  "#437d45",
  "#346e35",
  "#255d26",
  "#184e1a",
  "#174215",
  "#103c0c",
];

const Map = ({ chart }: Props) => {
  const [activeKreis, setActiveKreis] = useState(0);
  const width = 500;
  const scaleX = 0.85; // HACK is squashed without this
  const [minX, minY, maxX, maxY] = bbox(geoJson);
  const height = ((maxY - minY) / (maxX - minX)) * width * (1 / scaleX ** 2);
  const x = scaleLinear()
    .range([0, width / scaleX])
    .domain([minX, maxX]);
  const y = scaleLinear().range([0, height]).domain([maxY, minY]);
  // https://bl.ocks.org/mbostock/6216797
  const projection = geoTransform({
    point: function (px: any, py: any) {
      this.stream.point(x(px) * scaleX, y(py));
    },
  });
  const path = geoPath().projection(projection);
  const colorScale = scaleQuantile<string>()
    .domain(chart.data.values.map((v: any) => v.value))
    .range(colors);

  const valuesWithoutCity = chart.data.values.filter(
    (v: any) => v.placeId !== 0
  );
  const colorBarX = 440;

  let separateRowUnit = chart.data.unit;
  let suffixUnit = "";
  if (separateRowUnit === "%") {
    separateRowUnit = "";
    suffixUnit = "%";
  }

  return (
    <CenteredLayout>
      <ChartCard
        style={{
          width: 200,
          marginRight: 30,
          marginBottom: 30,
          padding: 30,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 30 }}>
          {activeKreis ? "Kreis " + activeKreis : "All of Zurich"}
        </div>
        <div style={{ fontSize: 60 }}>
          {chart.data.values.find((v: any) => v.placeId === activeKreis).value}
          {suffixUnit}
        </div>
        {separateRowUnit && (
          <div style={{ fontSize: 30 }}>{separateRowUnit}</div>
        )}
      </ChartCard>
      <ChartCard style={{ padding: 30 }}>
        <div
          style={{
            position: "relative",
            width: width,
            height,
          }}
        >
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
              x={colorBarX}
              y={10}
              width={20}
              height={100}
              fill="url(#linear-gradient)"
              stroke="black"
              strokeWidth={0.5}
            />
            <text x={colorBarX + 25} y={23} fill="black">
              {Math.max(...valuesWithoutCity.map((v: any) => v.value))}
            </text>
            <text x={colorBarX + 25} y={108} fill="black">
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
            {zurisee.features.map((feature: any) => {
              return (
                <path
                  data-tip={"Zürisee"}
                  key={`Zürisee`}
                  stroke="black"
                  strokeWidth={0.25}
                  d={path(feature) ?? undefined}
                  fill={"#83d8f2"}
                />
              );
            })}
          </svg>
        </div>
      </ChartCard>
    </CenteredLayout>
  );
};

export default React.memo(Map);
