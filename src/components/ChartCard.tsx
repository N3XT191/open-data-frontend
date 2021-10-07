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
    display: block;
    color: gray;
    padding: 15px;
    padding-top: 0;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

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
        <a href={sourceUrl} className={styles.source}>
          {sourceLabel}
        </a>
      )}
    </div>
  );
};
