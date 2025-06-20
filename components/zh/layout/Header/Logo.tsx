import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import styles from "./Logo.module.css";
import logo from "@/public/images/seekreturns-logo.png";

type LogoProps = { className?: string };

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/zh" className={clsx(styles.logo, className)}>
      <Image src={logo} alt="Seek Returns 标志" className={styles.image} />
    </Link>
  );
}
