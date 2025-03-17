import katex from "katex";
import clsx from "clsx";

import styles from "./Math.module.css";

type InlineMathProps = { math: string; className?: string };

type BlockMathProps = { math: string; className?: string };

export function InlineMath({ math, className }: InlineMathProps) {
  const html = katex.renderToString(math, { displayMode: false });

  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className={clsx(styles.inlineMath, className)}
    />
  );
}

export function BlockMath({ math, className }: BlockMathProps) {
  const html = katex.renderToString(math, { displayMode: true });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={clsx(styles.blockMath, className)}
    />
  );
}
