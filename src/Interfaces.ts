export interface Question {
	id: number;
	text: string;
}

export interface Answer {
	id: number;
	data: any;
	chart_type: "value" | "bar" | "line" | "pie" | "table" | "multi-line" | "map";
	x_axis_time?: boolean;
	graph_label: string;
}
