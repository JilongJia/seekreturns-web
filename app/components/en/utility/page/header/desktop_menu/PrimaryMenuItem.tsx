"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./PrimaryMenuItem.module.css";

type PrimaryMenuItemProps = { label: string; href: string; className?: string };

export function PrimaryMenuItem({
  label,
  href,
  className,
}: PrimaryMenuItemProps) {
  const pathname = usePathname();

  return (
    <li className={className}>
      <Link
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        className={styles.link}
      >
        {label}
      </Link>
    </li>
  );
}
