import { fontSize, sansSerif } from "./victory-theme";

export interface TextSize {
  width: number;
  height: number;
}

export function arrayFromTextSize({ width, height }: TextSize): number[] {
  return [width, height];
}

export type TextMeasurementFunction = (text: string) => TextSize;

interface AdvancedTextMetrics extends TextMetrics {
  fontBoundingBoxAscent: number;
  fontBoundingBoxDescent: number;
}

function isAdvancedTextMetrics(
  _metrics: TextMetrics
): _metrics is AdvancedTextMetrics {
  const metrics: typeof _metrics & {
    fontBoundingBoxAscent?: unknown;
    fontBoundingBoxDescent?: unknown;
  } = _metrics;
  return (
    "fontBoundingBoxAscent" in metrics &&
    typeof metrics.fontBoundingBoxAscent === "number" &&
    "fontBoundingBoxDescent" in metrics &&
    typeof metrics.fontBoundingBoxDescent === "number"
  );
}

export function makeTextMeasurementFunction(
  font: string,
  fallbackHeight: number
): TextMeasurementFunction {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("failed to get canvas context");
  }
  ctx.font = font;
  return (text) => {
    const metrics = ctx.measureText(text);
    if (isAdvancedTextMetrics(metrics)) {
      return {
        width: metrics.width,
        height: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
      };
    }
    return {
      width: metrics.width,
      height: fallbackHeight,
    };
  };
}

export class TextMeasurementCache {
  private resultsLastPass = new Map<string, TextSize>();
  private resultsThisPass = new Map<string, TextSize>();

  constructor(private measureNoCache: TextMeasurementFunction) {}

  measure(text: string): TextSize {
    const cachedSize =
      this.resultsThisPass.get(text) || this.resultsLastPass.get(text);
    if (cachedSize) {
      return cachedSize;
    }
    const size = this.measureNoCache(text);
    this.resultsThisPass.set(text, size);
    return size;
  }

  clearUnused() {
    this.resultsLastPass = this.resultsThisPass;
    this.resultsThisPass = new Map();
  }
}

export const textMeasurementCaches = {
  plotLabel: new TextMeasurementCache(
    makeTextMeasurementFunction(`${fontSize}px ${sansSerif}`, fontSize)
  ),
};
