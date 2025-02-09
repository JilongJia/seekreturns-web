import clsx from "clsx";

import styles from "./Caption.module.css";

type CaptionProps = {
  children: React.ReactNode;
  captionSide?: "top" | "bottom";
  className?: string;
};

export function Caption({ children, captionSide, className }: CaptionProps) {
  return (
    <caption
      className={clsx(
        styles.caption,
        captionSide === "top" ? styles.top : styles.bottom,
        className,
      )}
    >
      {children}
    </caption>
  );
}
