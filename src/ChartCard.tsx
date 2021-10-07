import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const styles = {
  outer: css`
    background: white;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
  `,
};

export const ChartCard = ({ children, style }: Props) => {
  return (
    <div className={styles.outer} style={style}>
      {children}
    </div>
  );
};
