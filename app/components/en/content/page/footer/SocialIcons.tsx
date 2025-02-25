import { SiFacebook, SiX } from "react-icons/si";
import { LuMail } from "react-icons/lu";

import styles from "./SocialIcons.module.css";

type SocialIconsProps = { className?: string };

export function SocialIcons({ className }: SocialIconsProps) {
  return (
    <nav aria-label="Social media links" className={className}>
      <menu className={styles.menu}>
        <li>
          <a
            href="https://www.facebook.com/cannytrading"
            className={styles.link}
          >
            <span className={styles.screenReaderText}>
              Visit Canny Trading on Facebook
            </span>
            <SiFacebook aria-hidden={true} className={styles.facebookIcon} />
          </a>
        </li>
        <li>
          <a href="https://x.com/CannyTrading" className={styles.link}>
            <span className={styles.screenReaderText}>
              Visit Canny Trading on X
            </span>
            <SiX aria-hidden={true} className={styles.xIcon} />
          </a>
        </li>
        <li>
          <a href="mailto:contact@contact.com" className={styles.link}>
            <span className={styles.screenReaderText}>
              Send an email to Canny Trading
            </span>
            <LuMail aria-hidden={true} className={styles.envelopeIcon} />
          </a>
        </li>
      </menu>
    </nav>
  );
}
