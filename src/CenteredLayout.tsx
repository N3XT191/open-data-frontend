import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

const styles = {
  outer: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  inner: css``,
};

export const CenteredLayout = ({ children }: Props) => {
  return <div className={styles.outer}>{children}</div>;
};
