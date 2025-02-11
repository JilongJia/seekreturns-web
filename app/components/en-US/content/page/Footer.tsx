import { Logo } from "@/app/components/en-US/content/page/footer/Logo";
import { CopyRight } from "@/app/components/en-US/content/page/footer/CopyRight";
import { Navbar } from "@/app/components/en-US/content/page/footer/Navbar";
import { SocialIcons } from "@/app/components/en-US/content/page/footer/SocialIcons";
import styles from "./Footer.module.css";

type FooterProps = { className?: string };

export function Footer({ className }: FooterProps) {
  return (
    <footer className={className}>
      <Logo className={styles.logo} />
      <SocialIcons className={styles.socialIcons} />
      <Navbar className={styles.navbar} />
      <CopyRight className={styles.copyRight} />
    </footer>
  );
}
