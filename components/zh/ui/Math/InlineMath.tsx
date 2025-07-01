import clsx from "clsx";
import katex from "katex";

import styles from "./InlineMath.module.css";

type InlineMathProps = { math: string; className?: string };

export function InlineMath({ math, className }: InlineMathProps) {
  const html = katex.renderToString(math, { displayMode: false });

  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className={clsx(styles.inlineMath, className)}
    />
  );
}
