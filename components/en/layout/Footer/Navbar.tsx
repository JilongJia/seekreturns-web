import Link from "next/link";

import styles from "./Navbar.module.css";

type NavbarProps = { className?: string };

export function Navbar({ className }: NavbarProps) {
  return (
    <nav aria-label="Footer menu" className={className}>
      <ul className={styles.menu}>
        <li>
          <Link href="/en/about" className={styles.link}>
            About
          </Link>
        </li>
        <li>
          <Link href="/en/privacy-policy" className={styles.link}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/en/terms-and-conditions" className={styles.link}>
            Terms & Conditions
          </Link>
        </li>
      </ul>
    </nav>
  );
}
