export interface LastSeenQuestion {
  id: number;
  offset: { x: number; y: number };
}

export const globalLastSeenQuestionsRef: { current: LastSeenQuestion[] } = {
  current: [],
};
