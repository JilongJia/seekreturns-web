import clsx from "clsx";

import { getHreflangAlternates } from "@/app/lib/db/getHreflangAlternates";

import { Header } from "@/app/components/en-US/root/layout/header/Header";
import { MobileMenu } from "@/app/components/en-US/root/layout/header/MobileMenu";
import { Logo } from "@/app/components/en-US/root/layout/header/Logo";
import { DesktopMenu } from "@/app/components/en-US/root/layout/header/DesktopMenu";
import { MobileSearchbox } from "@/app/components/en-US/root/layout/header/MobileSearchbox";
import { DesktopSearchbox } from "@/app/components/en-US/root/layout/header/DesktopSearchbox";
import { LanguageSelector } from "@/app/components/en-US/root/layout/header/LanguageSelector";
import styles from "./Page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const hreflangAlternates = await getHreflangAlternates(
    `/en-US/guides/${slug}`,
  );

  return (
    <Header className={clsx(styles.header, "layoutContainer")}>
      <MobileMenu className={styles.mobileMenu} />
      <Logo className={styles.logo} />
      <DesktopMenu className={styles.desktopMenu} />
      <MobileSearchbox className={styles.mobileSearchbox} />
      <DesktopSearchbox className={styles.desktopSearchbox} />
      <LanguageSelector
        hreflangAlternates={hreflangAlternates}
        className={styles.languageSelector}
      />
    </Header>
  );
}

export default Page;
