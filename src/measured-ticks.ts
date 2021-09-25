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
  const labels = chartData.map((e) => tickFormat((e as any)[axis]));
  if (!chartData.length) {
    return undefined;
  }
  return Math.max(
    ...labels.map((l) => textMeasurementCaches.plotLabel.measure(l).width)
  );
}
