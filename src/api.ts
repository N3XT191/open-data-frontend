import { Answer } from "./Interfaces";

const baseURL = "http://127.0.0.1:8000";

const getData = async (route: string) => {
	const res = await fetch(baseURL + route);
	const data = await res.json();
	return data;
};

const sendData = async (
	route: string,
	payload: object,
	method: string = "post"
) => {
	try {
		const res = await fetch(baseURL + route, {
			method,
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		return await res.json();
	} catch {
		return { success: false, message: "request failed" };
	}
};

export const getQuestions = async () => await getData("/questions");
/*export const getQuestions = async () =>
	await [
		{ id: 1, question: "How many people use the Line 4 each day?" },
		{ id: 2, question: "Which Line is the busiest on weekends?" },
		{ id: 3, question: "Which tram stop is used the fewest?" },
		{ id: 4, question: "Which bus line is used the most?" },
	];*/

const chartSettings = [
	{},
	{
		chart_type: "line",
		x_axis_type: true,
		graph_label: "CO2 in [Unit] over time",
	},
	{
		chart_type: "line",
		x_axis_type: true,
		graph_label: "Ozone in [Unit] over time",
	},
	{
		chart_type: "pie",
		x_axis_type: true,
		graph_label: "Air pollution [normalized] over time",
	},
];
export const askQuestion = async (question_id: number) => {
	return {
		id: question_id,
		data: await sendData("/answer", { id: question_id }),
		chart_type: chartSettings[question_id].chart_type,
		x_axis_time: chartSettings[question_id].x_axis_type,
		graph_label: chartSettings[question_id].graph_label,
	} as Answer;
};
/*const answers = [
	{ id: 1, data: 55.7, chart_type: "pie" },
	{
		id: 2,
		data: [
			{ x: "2019-09-07", y: 1 },
			{ x: "2019-09-10", y: 3 },
			{ x: "2019-09-15", y: 2 },
			{ x: "2019-10-10", y: 4 },
		],
		chart_type: "line",
		x_axis_time: true,
	},
	{ id: 3, data: 55.7, chart_type: "pie" },
	{ id: 4, data: 55.7, chart_type: "pie" },
] as Answer[];
export const askQuestion = async (question_id: number) => {
	await new Promise((r) => setTimeout(r, 1000));
	return answers.find((a) => a.id === question_id);
};*/
