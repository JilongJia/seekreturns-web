import Link from "next/link";

import styles from "./Navbar.module.css";

type NavbarProps = { className?: string };

export function Navbar({ className }: NavbarProps) {
  return (
    <nav aria-label="Footer menu" className={className}>
      <menu className={styles.menu}>
        <li>
          <Link href="/en-US/about" className={styles.link}>
            About
          </Link>
        </li>
        <li>
          <Link href="/en-US/privacy-policy" className={styles.link}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/en-US/terms-and-conditions" className={styles.link}>
            Terms & Conditions
          </Link>
        </li>
      </menu>
    </nav>
  );
}
