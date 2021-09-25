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
  graph_label?: string;
  hide_x_axis?: boolean;
}
