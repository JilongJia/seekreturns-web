import clsx from "clsx";

import { MobileMenu } from "./header/MobileMenu";
import { Logo } from "./header/Logo";
import { DesktopMenu } from "./header/DesktopMenu";
import { MobileSearchbox } from "./header/MobileSearchbox";
import { DesktopSearchbox } from "./header/DesktopSearchbox";
import { LanguageSelector } from "./header/LanguageSelector";
import styles from "./Header.module.css";

type HeaderProps = { pathname: string; className?: string };

export async function Header({ pathname, className }: HeaderProps) {
  const pathnameSegments = pathname.split("/");
  const sectionSegment = pathnameSegments[2];

  const languages = ["en", "zh"];
  const hreflangAlternates = languages.map((lang) => ({
    pathname: `/${lang}/${sectionSegment}`,
  }));

  return (
    <header className={clsx(styles.header, className)}>
      <MobileMenu className={styles.mobileMenu} />
      <Logo className={styles.logo} />
      <DesktopMenu className={styles.desktopMenu} />
      <MobileSearchbox className={styles.mobileSearchbox} />
      <DesktopSearchbox className={styles.desktopSearchbox} />
      <LanguageSelector
        hreflangAlternates={hreflangAlternates}
        className={styles.languageSelector}
      />
    </header>
  );
}
