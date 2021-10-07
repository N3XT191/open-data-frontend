import { css } from "@emotion/css";
import { greys } from "../victory-theme";
import { CornerTriangle } from "./CornerTriangle";

const styles = {
  wrapper: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${greys[3]};
    z-index: -10;
    user-select: none;
    pointer-events: none;
  `,
  leftTriangle: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `,
  rightTriangle: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(180deg);
  `,
};
interface Props {
  windowSize: { width: number; height: number };
}
const Background: React.FC<Props> = ({ windowSize }) => {
  const scalingFactor = Math.min(
    Math.min(windowSize.height / 800, windowSize.width / 800),
    1,
  );
  return (
    <div className={styles.wrapper}>
      {windowSize.width > 900 && (
        <div className={styles.leftTriangle}>
          <CornerTriangle
            width={350 * scalingFactor}
            height={500 * scalingFactor}
          />
        </div>
      )}

      {windowSize.width > 500 && (
        <div className={styles.rightTriangle}>
          <CornerTriangle
            width={180 * scalingFactor}
            height={400 * scalingFactor}
          />
        </div>
      )}
    </div>
  );
};
export default Background;
