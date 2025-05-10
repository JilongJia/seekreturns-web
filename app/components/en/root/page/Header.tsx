import clsx from "clsx";

import { MobileMenu } from "./header/MobileMenu";
import { Logo } from "./header/Logo";
import { DesktopMenu } from "./header/DesktopMenu";
import { MobileSearchbox } from "./header/MobileSearchbox";
import { DesktopSearchbox } from "./header/DesktopSearchbox";
import { LanguageSelector } from "./header/LanguageSelector";
import styles from "./Header.module.css";

type HeaderProps = { className?: string };

export function Header({ className }: HeaderProps) {
  return (
    <header className={clsx(styles.header, className)}>
      <MobileMenu className={styles.mobileMenu} />
      <Logo className={styles.logo} />
      <DesktopMenu className={styles.desktopMenu} />
      <MobileSearchbox className={styles.mobileSearchbox} />
      <DesktopSearchbox className={styles.desktopSearchbox} />
      <LanguageSelector className={styles.languageSelector} />
    </header>
  );
}
