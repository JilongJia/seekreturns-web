"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./SecondaryMenuItem.module.css";

type SecondaryMenuItemProps = {
  label: string;
  href: string;
  className?: string;
};

export function SecondaryMenuItem({
  label,
  href,
  className,
}: SecondaryMenuItemProps) {
  const pathname = usePathname();

  return (
    <li className={className}>
      <Link
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        className={styles.menuItemLink}
      >
        {label}
      </Link>
    </li>
  );
}
