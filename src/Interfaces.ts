import { DomainPaddingPropType } from "victory-core";

export interface Question {
  id: number;
  text: string;
}

export interface Answer {
  id: number;
  data: any;
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
}
