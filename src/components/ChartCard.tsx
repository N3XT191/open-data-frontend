import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  src_label: string;
}

const styles = {
  outer: css`
    background: white;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
  `,
  src_label: css`
    font-size: 15px;
    color: gray;
    margin: 15px;
    margin-left: 0;
    margin-top: 0;
    text-align: right;
  `,
};

export const ChartCard = ({ children, style, src_label }: Props) => {
  return (
    <div className={styles.outer} style={style}>
      {children}
      <div className={styles.src_label}>
        <a href={src_label}>Source</a>
      </div>
    </div>
  );
};
