import { Logo } from "./footer/Logo";
import { CopyRight } from "./footer/CopyRight";
import { Navbar } from "./footer/Navbar";
import { SocialIcons } from "./footer/SocialIcons";
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
