import Link from "next/link";

import styles from "./Navbar.module.css";

type NavbarProps = { className?: string };

export function Navbar({ className }: NavbarProps) {
  return (
    <nav aria-label="页脚菜单" className={className}>
      <ul className={styles.menu}>
        <li>
          <Link href="/zh/about" className={styles.link}>
            关于我们
          </Link>
        </li>
        <li>
          <Link href="/zh/privacy-policy" className={styles.link}>
            隐私政策
          </Link>
        </li>
        <li>
          <Link href="/zh/terms-and-conditions" className={styles.link}>
            服务条款
          </Link>
        </li>
      </ul>
    </nav>
  );
}
