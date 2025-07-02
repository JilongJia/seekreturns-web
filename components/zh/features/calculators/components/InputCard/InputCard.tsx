import clsx from "clsx";

import { Label, ScreenReaderLabel } from "./Label";
import { NumberInput } from "./Input";
import { RangeInput } from "./RangeInput";

import styles from "./InputCard.module.css";

type InputCardProps = { children: React.ReactNode; className?: string };

export function InputCard({ children, className }: InputCardProps) {
  return (
    <div aria-label="输入卡片" className={clsx(styles.inputCard, className)}>
      {children}
    </div>
  );
}

InputCard.Label = Label;
InputCard.RangeInput = RangeInput;
InputCard.NumberInput = NumberInput;
InputCard.ScreenReaderLabel = ScreenReaderLabel;
