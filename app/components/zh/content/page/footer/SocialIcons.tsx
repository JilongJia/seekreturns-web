import { SiFacebook, SiX } from "react-icons/si";
import { LuMail } from "react-icons/lu";

import styles from "./SocialIcons.module.css";

type SocialIconsProps = { className?: string };

export function SocialIcons({ className }: SocialIconsProps) {
  return (
    <nav aria-label="社交媒体链接" className={className}>
      <menu className={styles.menu}>
        <li>
          <a
            href="https://www.facebook.com/cannytrading"
            className={styles.link}
          >
            <span className={styles.screenReaderText}>
              在 Facebook 上访问 Canny Trading
            </span>
            <SiFacebook aria-hidden={true} className={styles.facebookIcon} />
          </a>
        </li>
        <li>
          <a href="https://x.com/CannyTrading" className={styles.link}>
            <span className={styles.screenReaderText}>
              在 X 上访问 Canny Trading
            </span>
            <SiX aria-hidden={true} className={styles.xIcon} />
          </a>
        </li>
        <li>
          <a href="mailto:contact@contact.com" className={styles.link}>
            <span className={styles.screenReaderText}>
              发送电子邮件到 Canny Trading
            </span>
            <LuMail aria-hidden={true} className={styles.envelopeIcon} />
          </a>
        </li>
      </menu>
    </nav>
  );
}
