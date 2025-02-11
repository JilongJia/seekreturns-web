import clsx from "clsx";

import { Label, ScreenReaderLabel } from "./input_card/Label";
import { NumberInput } from "./input_card/Input";
import { RangeInput } from "./input_card/RangeInput";
import styles from "./InputCard.module.css";

type InputCardProps = { children: React.ReactNode; className?: string };

export function InputCard({ children, className }: InputCardProps) {
  return (
    <div aria-label="Input card" className={clsx(styles.inputCard, className)}>
      {children}
    </div>
  );
}

InputCard.Label = Label;
InputCard.RangeInput = RangeInput;
InputCard.NumberInput = NumberInput;
InputCard.ScreenReaderLabel = ScreenReaderLabel;
