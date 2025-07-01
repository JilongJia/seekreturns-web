import clsx from "clsx";

import { Image } from "./Image";
import { Figcaption } from "./Figcaption";

import styles from "./ImageFigure.module.css";

type ImageFigureProps = {
  children: React.ReactNode;
  float?: "left" | "right";
  className?: string;
};

export function ImageFigure({ children, float, className }: ImageFigureProps) {
  return (
    <figure
      className={clsx(
        styles.imageFigure,
        {
          [styles.floatLeft]: float === "left",
          [styles.floatRight]: float === "right",
          [styles.noFloat]: !float,
        },
        className,
      )}
    >
      {children}
    </figure>
  );
}

ImageFigure.Image = Image;
ImageFigure.Figcaption = Figcaption;
