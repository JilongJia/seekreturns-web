import { Logo } from "./Logo";
import { CopyRight } from "./CopyRight";
import { Navbar } from "./Navbar";
import { SocialIcons } from "./SocialIcons";

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
