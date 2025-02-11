import clsx from "clsx";

import { Label } from "./output_card/Label";
import { Output } from "./output_card/Output";
import { P } from "./output_card/P";
import styles from "./OutputCard.module.css";

type OutputCardProps = { children: React.ReactNode; className?: string };

export function OutputCard({ children, className }: OutputCardProps) {
  return (
    <div
      aria-label="Output card"
      className={clsx(styles.outputCard, className)}
    >
      {children}
    </div>
  );
}

OutputCard.Label = Label;
OutputCard.Output = Output;
OutputCard.P = P;
