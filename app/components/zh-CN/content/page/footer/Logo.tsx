import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import styles from "./Logo.module.css";

import logo from "@/app/images/zh-CN/cannytrading-logo.png";

type LogoProps = { className?: string };

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/zh-CN" className={clsx(styles.logo, className)}>
      <Image src={logo} alt="Canny Trading 标志" className={styles.image} />
    </Link>
  );
}
