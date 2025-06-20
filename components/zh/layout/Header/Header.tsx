import clsx from "clsx";

import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";
import { DesktopMenu } from "./DesktopMenu";
import { MobileSearchbox } from "./MobileSearchbox";
import { DesktopSearchbox } from "./DesktopSearchbox";
import { LanguageSelector } from "./LanguageSelector";

import { getHreflangPages } from "@/lib/seo";

import { primaryMenu } from "./menu";
import styles from "./Header.module.css";

type HeaderProps = { pathname: string; className?: string };

export async function Header({ pathname, className }: HeaderProps) {
  const hreflangPages = await getHreflangPages(pathname);

  return (
    <header className={clsx(styles.header, className)}>
      <MobileMenu menuItems={primaryMenu} className={styles.mobileMenu} />
      <Logo className={styles.logo} />
      <DesktopMenu menuItems={primaryMenu} className={styles.desktopMenu} />
      <MobileSearchbox className={styles.mobileSearchbox} />
      <DesktopSearchbox className={styles.desktopSearchbox} />
      <LanguageSelector
        hreflangPages={hreflangPages}
        className={styles.languageSelector}
      />
    </header>
  );
}
