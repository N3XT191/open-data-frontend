import bbox from "@turf/bbox";
import { geoPath, geoTransform } from "d3-geo";
import { scaleLinear } from "d3-scale";
import { times } from "lodash";
import React, { useState } from "react";
import { Answer } from "../Interfaces";
import geoJson from "../map-data/stadtkreise.json";
import zurisee from "../map-data/zurisee.json";
import {
  chartTitleSize,
  colors,
  colorsForScale,
  greys,
} from "../victory-theme";
import { CenteredLayout } from "./CenteredLayout";
import { ChartCard } from "./ChartCard";

type Props = {
  chart: Answer;
  width: number;
  height: number;
};

const _MapChart = ({
  chart,
  width: targetWidth,
  height: targetHeight,
}: Props) => {
  const [activeKreis, setActiveKreis] = useState(0);
  const [minX, minY, maxX, maxY] = bbox(geoJson);

  const scaleX = 0.85; // HACK is squashed without this
  const stuffFromWidth = (width: number) => {
    const x = scaleLinear()
      .range([0, width / scaleX])
      .domain([minX, maxX]);
    const height = ((maxY - minY) / (maxX - minX)) * width * (1 / scaleX ** 2);
    return { x, height, width };
  };

  let stuff = stuffFromWidth(targetWidth);
  if (stuff.height > targetHeight) {
    stuff = stuffFromWidth((targetWidth * targetHeight) / stuff.height);
  }
  const { x, width, height } = stuff;

  const y = scaleLinear().range([0, height]).domain([maxY, minY]);
  // https://bl.ocks.org/mbostock/6216797
  const projection = geoTransform({
    point: function (px: any, py: any) {
      this.stream.point(x(px) * scaleX, y(py));
    },
  });
  const path = geoPath().projection(projection);

  const valuesWithoutCity = chart.data.values.filter(
    (v: any) => v.placeId !== 0,
  );

  const colorBarX = width - 60;
  const stopCount = 10;
  const colorAxisDomain = [
    Math.min(...valuesWithoutCity.map((v: any) => v.value)),
    Math.max(...valuesWithoutCity.map((v: any) => v.value)),
  ];
  const colorScale = scaleLinear<string>()
    .domain(colorAxisDomain)
    .range(colorsForScale);

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
        <div style={{ fontSize: chartTitleSize, color: greys[1] }}>
          {activeKreis ? "Kreis " + activeKreis : "All of Zurich"}
        </div>
        <div style={{ fontSize: 60, color: colors[1] }}>
          {chart.data.values.find((v: any) => v.placeId === activeKreis)?.value}
          {suffixUnit}
        </div>
        {separateRowUnit && (
          <div style={{ fontSize: chartTitleSize, color: greys[1] }}>
            {separateRowUnit}
          </div>
        )}
      </ChartCard>
      <ChartCard sourceUrl={chart.src_url} sourceLabel={chart.src_label}>
        <div
          style={{
            position: "relative",
            width,
            height,
            margin: 30,
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
                {times(stopCount, (i) => {
                  const p = i / (stopCount - 1);
                  return (
                    <stop
                      offset={p * 100 + "%"}
                      stopColor={colorScale(
                        p * colorAxisDomain[0] + (1 - p) * colorAxisDomain[1],
                      )}
                      key={i}
                    />
                  );
                })}
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
              {colorAxisDomain[1]}
              {suffixUnit}
            </text>
            <text x={colorBarX + 25} y={108} fill="black">
              {colorAxisDomain[0]}
              {suffixUnit}
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
                  fill={
                    caseCount !== undefined
                      ? colorScale(caseCount)
                      : "#ffffff00"
                  }
                  onMouseEnter={() => setActiveKreis(name)}
                  onMouseLeave={() => setActiveKreis(0)}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
            {zurisee.features.map((feature: any) => {
              return (
                <path
                  data-tip={"Z??risee"}
                  key={`Z??risee`}
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

export const MapChart = React.memo(_MapChart);
