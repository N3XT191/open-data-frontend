import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  sourceUrl?: string;
  sourceLabel?: string;
}

const styles = {
  outer: css`
    background: white;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
  `,
  source: css`
    font-size: 15px;
    color: gray;
    margin: 15px;
    margin-left: 0;
    margin-top: 0;
    text-align: right;

    :hover {
      text-decoration: underline;
    }
  `,
};

export const ChartCard = ({
  children,
  style,
  sourceUrl,
  sourceLabel,
}: Props) => {
  return (
    <div className={styles.outer} style={style}>
      {children}
      {sourceLabel && sourceUrl && (
        <div className={styles.source}>
          <a href={sourceUrl}>{sourceLabel}</a>
        </div>
      )}
    </div>
  );
};
