import clsx from "clsx";
import Image, { type StaticImageData } from "next/image";

import styles from "./Img.module.css";

type ImgProps = {
  src: StaticImageData;
  alt: string;
  float?: "left" | "right";
  className?: string;
};

export function Img({ src, alt, float, className }: ImgProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={clsx(
        styles.img,
        {
          [styles.floatLeft]: float === "left",
          [styles.floatRight]: float === "right",
          [styles.noFloat]: !float,
        },
        className,
      )}
    />
  );
}
