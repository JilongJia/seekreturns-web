import clsx from "clsx";

import { getHreflangAlternatePages } from "@/app/lib/db/getHreflangAlternatePages";

import { MobileMenu } from "./header/MobileMenu";
import { Logo } from "./header/Logo";
import { DesktopMenu } from "./header/DesktopMenu";
import { MobileSearchbox } from "./header/MobileSearchbox";
import { DesktopSearchbox } from "./header/DesktopSearchbox";
import { LanguageSelector } from "./header/LanguageSelector";
import styles from "./Header.module.css";

type HeaderProps = { pathname: string; className?: string };

export async function Header({ pathname, className }: HeaderProps) {
  let hreflangAlternatePages;
  const pathnameSegments = pathname.split("/");

  if (
    pathnameSegments.length > 2 &&
    pathnameSegments[2] === "stock-comparisons"
  ) {
    const languages = ["en", "zh"];
    const remainingPathname = pathnameSegments.slice(2).join("/");
    hreflangAlternatePages = languages.map((lang) => ({
      pathname: `/${lang}/${remainingPathname}`,
    }));
  } else {
    hreflangAlternatePages = await getHreflangAlternatePages(pathname);
  }

  return (
    <header className={clsx(styles.header, className)}>
      <MobileMenu className={styles.mobileMenu} />
      <Logo className={styles.logo} />
      <DesktopMenu className={styles.desktopMenu} />
      <MobileSearchbox className={styles.mobileSearchbox} />
      <DesktopSearchbox className={styles.desktopSearchbox} />
      <LanguageSelector
        hreflangAlternatePages={hreflangAlternatePages}
        className={styles.languageSelector}
      />
    </header>
  );
}
