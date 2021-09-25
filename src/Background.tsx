import { css } from "@emotion/css";

const styles = {
  wrapper: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #eeeeee;
    z-index: -10;
  `,
  triangle: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    background: #743fca;
  `,
  leftTriangle: css`
    transform: translate(-50%, 50%) rotate(55deg);
  `,
  rightTriangle: css`
    transform: translate(25%, -30%) rotate(75deg);
  `,
};

export const Background = () => {
  return (
    <div className={styles.wrapper}>
      {/* <div className={[styles.triangle, styles.leftTriangle].join(" ")} />
      <div className={[styles.triangle, styles.rightTriangle].join(" ")} /> */}
    </div>
  );
};

// temp = df['2019':'2020']
// temp = temp[temp >= 1000]
