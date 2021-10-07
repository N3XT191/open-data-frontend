import { Answer } from "../Interfaces";

export const baseURL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const getData = async (route: string) => {
  const res = await fetch(baseURL + route);
  if (!res.ok) {
    throw new Error("Request failed");
  }
  const data = await res.json();
  return data;
};

const sendData = async (
  route: string,
  payload: object,
  method: string = "post",
) => {
  const res = await fetch(baseURL + route, {
    method,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Request failed");
  }
  return await res.json();
};

export const getQuestions = async () => await getData("/questions");

export const chartSettings: Omit<Answer, "data">[] = [
  {
    id: 1,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "CO in [mg/m3] over time",
  },
  {
    id: 2,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "Ozone in [µg/m3] over time",
  },
  {
    id: 3,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "Air pollution [normalized] over time",
  },
  {
    id: 4,
    chart_type: "table",
    x_axis_time: true,
    graph_label: "Current air pollution in Zurich",
  },
  {
    id: 5,
    chart_type: "table",
    x_axis_time: true,
    graph_label: "Current air pollution in Zurich",
  },
  {
    id: 6,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "Nitrogen Monoxide in [µg/m3] over time",
  },
  {
    id: 7,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "Nitrogen Dioxide in [µg/m3] over time",
  },
  {
    id: 8,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "Particulate Matter in [Unit] over time",
  },
  {
    id: 9,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "Particulate Matter in [µg/m3] over time",
  },
  {
    id: 10,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "PM2.5 in [µg/m3] over time",
  },
  {
    id: 11,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "Sulphur Dioxide in [µg/m3] over time",
  },
  {
    id: 12,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "Air pollution [normalized] over time",
  },
  {
    id: 13,
    chart_type: "multi-line",
    x_axis_time: true,
    graph_label: "Air pollution [normalized] over the course of a year",
  },
  {
    id: 14,
    chart_type: "multi-line",
    x_axis_hours: true,
    graph_label: "Air pollution [normalized] over the course of a day",
  },
] as any[];

for (let i = 15; i <= 57; i++) {
  chartSettings.push({ id: i, chart_type: "map" });
}
chartSettings.push({ id: 76, chart_type: "map" });

for (let i = 58; i <= 58; i++) {
  chartSettings.push({
    id: i,
    chart_type: "line",
    x_axis_time: true,
  });
}
for (let i = 59; i <= 59; i++) {
  chartSettings.push({
    id: i,
    chart_type: "line",
    x_axis_time: true,
    graph_label: "Power [kW] consumption (weekly average)",
    domain_padding: { y: 25 },
  });
}
chartSettings.push({
  id: 60,
  chart_type: "line",
  graph_label: "Average power [kW] consumption by hour of day",
  x_axis_hours: true,
});
chartSettings.push({
  id: 61,
  chart_type: "bar",
  graph_label: "Average power [kW] consumption by weekday",
});

chartSettings.push({
  id: 62,
  chart_type: "line",
  graph_label: "Average power [kW] consumption per day of year",
});
for (let i = 63; i <= 68; i++) {
  chartSettings.push({
    id: i,
    chart_type: "pie",
  });
}
for (let i = 69; i <= 69; i++) {
  chartSettings.push({
    id: i,
    chart_type: "bar",
    hide_x_axis: true,
  });
}
chartSettings.push({
  id: 70,
  chart_type: "map",
});
for (let i = 71; i <= 72; i++) {
  chartSettings.push({
    id: i,
    chart_type: "bar",
    hide_x_axis: true,
    graph_label: "Number of owners per age group",
  });
}
chartSettings.push({
  id: 73,
  chart_type: "number",
});
for (let i = 74; i <= 75; i++) {
  chartSettings.push({
    id: i,
    chart_type: "bar",
    graph_label: "Number of dogs born per year",
    hide_x_axis: true,
  });
}

export const askQuestion = async (question_id: number) => {
  const settings = chartSettings.find((s) => s.id === question_id)!;
  return {
    ...settings,
    id: question_id,
    data: await getData(`/answer/${question_id}`),
  } as Answer;
};

export const getSearchResults = async (query: string) => {
  return sendData(`/search?query=${encodeURIComponent(query)}`, {});
};
