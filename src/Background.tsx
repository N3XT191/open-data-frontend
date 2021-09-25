import { css } from "@emotion/css";
import { CornerTriangle } from "./CornerTriangle";

const styles = {
  wrapper: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #eeeeee;
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

export const Background = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftTriangle}>
        <CornerTriangle width={350} height={500} />
      </div>
      <div className={styles.rightTriangle}>
        <CornerTriangle width={180} height={400} />
      </div>
    </div>
  );
};
