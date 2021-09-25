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

const chartSettings = [
  {
    id: 1,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "CO2 in [Unit] over time",
  },
  {
    id: 2,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "Ozone in [Unit] over time",
  },
  {
    id: 3,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "Air pollution [normalized] over time",
  },
  {
    id: 4,
    chart_type: "table",
    x_axis_type: true,
    graph_label: "Current air pollution in Zurich",
  },
  {
    id: 5,
    chart_type: "table",
    x_axis_type: true,
    graph_label: "Current air pollution in Zurich",
  },
  {
    id: 6,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "Nitrogen Monoxide in [Unit] over time",
  },
  {
    id: 7,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "Nitrogen Dioxide in [Unit] over time",
  },
  {
    id: 8,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "Particulate Matter in [Unit] over time",
  },
  {
    id: 9,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "Particulate Matter in [Unit] over time",
  },
  {
    id: 10,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "PM2.5 in [Unit] over time",
  },
  {
    id: 11,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "Sulphur Dioxide in [Unit] over time",
  },
  {
    id: 12,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "Air pollution [normalized] over time",
  },
  {
    id: 13,
    chart_type: "multi-line",
    x_axis_type: true,
    graph_label: "Air pollution [normalized] over time",
  },
  {
    id: 14,
    chart_type: "multi-line",
    x_axis_type: true,
    graph_label: "Air pollution [normalized] over time",
  },
] as any[];

for (let i = 15; i <= 57; i++) {
  chartSettings.push({ id: i, chart_type: "map" });
}
for (let i = 58; i <= 59; i++) {
  chartSettings.push({
    id: i,
    chart_type: "line",
    x_axis_type: true,
    graph_label: "asdf",
  });
}
for (let i = 59; i <= 62; i++) {
  chartSettings.push({
    id: i,
    chart_type: "line",
    x_axis_type: false,
    graph_label: "asdf",
  });
}
for (let i = 63; i <= 68; i++) {
  chartSettings.push({
    id: i,
    chart_type: "pie",
    x_axis_type: false,
    graph_label: "asdf",
  });
}
for (let i = 69; i <= 69; i++) {
  chartSettings.push({
    id: i,
    chart_type: "bar",
    x_axis_type: false,
    graph_label: "asdf",
  });
}
chartSettings.push({
  id: 70,
  chart_type: "map",
  x_axis_type: false,
});
for (let i = 71; i <= 72; i++) {
  chartSettings.push({
    id: i,
    chart_type: "bar",
    x_axis_type: false,
    graph_label: "asdf",
  });
}
chartSettings.push({
  id: 73,
  chart_type: "number",
  x_axis_type: false,
});
for (let i = 74; i <= 75; i++) {
  chartSettings.push({
    id: i,
    chart_type: "bar",
    x_axis_type: false,
    graph_label: "Year of Birth of dogs",
  });
}

export const askQuestion = async (question_id: number) => {
  const settings = chartSettings.find((s) => s.id === question_id)!;
  return {
    id: question_id,
    data: await sendData("/answer", { id: question_id }),
    chart_type: settings.chart_type,
    x_axis_time: settings.x_axis_type,
    graph_label: settings.graph_label,
  } as Answer;
};

export const getSearchResults = async (query: string) => {
  return sendData(`/search?query=${encodeURIComponent(query)}`, {});
};
