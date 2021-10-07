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


export const askQuestion = async (question_id: number) => {
  return {
    id: question_id,
    data: await getData(`/answer/${question_id}`),
  } as Answer;
};

export const getSearchResults = async (query: string) => {
  return sendData(`/search?query=${encodeURIComponent(query)}`, {});
};
