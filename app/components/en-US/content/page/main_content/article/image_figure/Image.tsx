import NextImage, { type StaticImageData } from "next/image";
import clsx from "clsx";

import styles from "./Image.module.css";

type ImageProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
};

export function Image({ src, alt, className }: ImageProps) {
  return (
    <NextImage src={src} alt={alt} className={clsx(styles.image, className)} />
  );
}
