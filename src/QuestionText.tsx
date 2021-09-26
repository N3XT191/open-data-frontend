import { chartTitleSize, questionSize } from "./victory-theme";

interface Props {
  text: string;
  windowSize: { width: number; height: number };
}

function getExpectedWidthForQuestion(windowWidth: number): number {
  const small = windowWidth <= 900;
  if (small) {
    return windowWidth - 20;
  }
  const paddingRight = 150;
  const expectedMargin = 50;
  return windowWidth - paddingRight - expectedMargin;
}

function getExpectedWidthForAnswer(windowWidth: number): number {
  const maxWidth = 800;
  const padding = 20;
  return Math.min(windowWidth, maxWidth) - 2 * padding;
}

export const QuestionText = ({ text, windowSize }: Props) => {
  const width = Math.min(
    getExpectedWidthForQuestion(windowSize.width),
    getExpectedWidthForAnswer(windowSize.width)
  );
  const fontSize = windowSize.width <= 900 ? 30 : questionSize;
  return (
    <div
      style={{
        width,
        fontSize,
        fontWeight: 500,
      }}
    >
      {text}
    </div>
  );
};
