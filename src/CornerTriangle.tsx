import { css } from "@emotion/css";

interface Props {
  height: number;
  width: number;
}

const styles = {
  wrapper: css`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  rect: css`
    position: absolute;
    bottom: 0;
    left: 0;
    background: red;
  `,
  triangle: css`
    position: absolute;
    bottom: 0;
    left: 0;
    background: #743fca;
    transform-origin: bottom left;
  `,
};

export const CornerTriangle = ({ width: rWidth, height: rHeight }: Props) => {
  const tWidth = Math.sqrt(rWidth ** 2 + rHeight ** 2);
  const tHeight = (rWidth * rHeight) / tWidth;
  const tAlpha = Math.atan2(rHeight, rWidth);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.rect}
        style={{ width: rWidth, height: rHeight, display: "none" }}
      />
      <div
        className={styles.triangle}
        style={{
          width: tWidth,
          height: tHeight,
          transform: `translateY(${-rHeight}px) rotate(${tAlpha}rad) scaleY(-1)`,
        }}
      />
    </div>
  );
};
