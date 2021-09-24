export interface Question {
	id: number;
	text: string;
}

export interface Answer {
	id: number;
	data: any;
	chart_type: "value" | "bar" | "line" | "pie";
	x_axis_time?: boolean;
	graph_title: string;
}
