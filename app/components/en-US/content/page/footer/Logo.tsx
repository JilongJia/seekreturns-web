import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import styles from "./Logo.module.css";

import logo from "@/public/canny-trading-logo.png";

type LogoProps = { className?: string };

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/en-US" className={clsx(styles.logo, className)}>
      <Image src={logo} alt="Canny Trading logo" className={styles.image} />
    </Link>
  );
}
