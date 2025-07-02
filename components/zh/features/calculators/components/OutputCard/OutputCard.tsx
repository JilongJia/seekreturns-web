import clsx from "clsx";

import { Label } from "./Label";
import { Output } from "./Output";
import { P } from "./P";

import styles from "./OutputCard.module.css";

type OutputCardProps = { children: React.ReactNode; className?: string };

export function OutputCard({ children, className }: OutputCardProps) {
  return (
    <div aria-label="输出卡片" className={clsx(styles.outputCard, className)}>
      {children}
    </div>
  );
}

OutputCard.Label = Label;
OutputCard.Output = Output;
OutputCard.P = P;
