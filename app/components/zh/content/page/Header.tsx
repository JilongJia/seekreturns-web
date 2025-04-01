import clsx from "clsx";

import { getHreflangAlternates } from "@/app/lib/db/getHreflangAlternates";

import { MobileMenu } from "./header/MobileMenu";
import { Logo } from "./header/Logo";
import { DesktopMenu } from "./header/DesktopMenu";
import { MobileSearchbox } from "./header/MobileSearchbox";
import { DesktopSearchbox } from "./header/DesktopSearchbox";
import { LanguageSelector } from "./header/LanguageSelector";
import styles from "./Header.module.css";

type HeaderProps = { pathname: string; className?: string };

export async function Header({ pathname, className }: HeaderProps) {
  let hreflangAlternates;
  const pathSegments = pathname.split("/");

  if (pathSegments.length > 2 && pathSegments[2] === "stock-comparisons") {
    const languages = ["en", "zh"];
    const remainingPath = pathSegments.slice(2).join("/");
    hreflangAlternates = languages.map((lang) => ({
      path: `/${lang}/${remainingPath}`,
    }));
  } else {
    hreflangAlternates = await getHreflangAlternates(pathname);
  }

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
