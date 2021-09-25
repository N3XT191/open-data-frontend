import { textMeasurementCaches } from "./text-measurement";

export const tickFormat = (v: unknown) => {
  if (typeof v === "number") {
    return "" + v;
  }
  return "" + v;
};

export function getLabelWidth(
  chartData: unknown[],
  axis: "x" | "y"
): number | undefined {
  if (chartData.length > 100) {
    console.warn(
      "unexpectedly many items passed to getLabelWidth",
      chartData.length
    );
  }

  if (chartData.some((e: any) => e[axis] === undefined)) {
    console.log(
      "getLabelWidth got undefined - are you sure your data has the right format",
      chartData
    );
  }

  const labels = chartData.map((e) => tickFormat((e as any)[axis]));
  if (!chartData.length) {
    return undefined;
  }
  console.log("DEBUG labels", labels);
  return Math.max(
    ...labels.map((l) => textMeasurementCaches.plotLabel.measure(l).width)
  );
}
