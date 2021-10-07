import { DomainPaddingPropType } from "victory-core";

export interface Question {
  id: number;
  text: string;
  usefulWordCount: number;
  frontend_settings: FrontendSettings;
}
interface FrontendSettings {
  chart_type:
    | "value"
    | "bar"
    | "line"
    | "pie"
    | "table"
    | "multi-line"
    | "map"
    | "number";
  x_axis_time?: boolean;
  x_axis_hours?: boolean;
  graph_label?: string;
  hide_x_axis?: boolean;
  domain_padding?: DomainPaddingPropType;
  src_label: string;
}
export interface Answer extends FrontendSettings {
  id: number;
  data: any;
}
