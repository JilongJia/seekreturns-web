import clsx from "clsx";
import katex from "katex";

import styles from "./BlockMath.module.css";

type BlockMathProps = { math: string; className?: string };

export function BlockMath({ math, className }: BlockMathProps) {
  const html = katex.renderToString(math, { displayMode: true });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={clsx(styles.blockMath, className)}
    />
  );
}
