import { SiYoutube, SiX } from "react-icons/si";
import { LuMail } from "react-icons/lu";

import styles from "./SocialIcons.module.css";

type SocialIconsProps = { className?: string };

export function SocialIcons({ className }: SocialIconsProps) {
  return (
    <nav aria-label="Social media links" className={className}>
      <menu className={styles.menu}>
        <li>
          <a
            href="https://www.youtube.com/@SeekReturnsOfficial"
            className={styles.link}
          >
            <span className={styles.screenReaderText}>
              Visit Seek Returns on YouTube
            </span>
            <SiYoutube aria-hidden={true} className={styles.youtubeIcon} />
          </a>
        </li>
        <li>
          <a href="https://x.com/SeekReturns" className={styles.link}>
            <span className={styles.screenReaderText}>
              Visit Seek Returns on X
            </span>
            <SiX aria-hidden={true} className={styles.xIcon} />
          </a>
        </li>
        <li>
          <a href="mailto:contact@seekreturns.com" className={styles.link}>
            <span className={styles.screenReaderText}>
              Send an email to Seek Returns
            </span>
            <LuMail aria-hidden={true} className={styles.envelopeIcon} />
          </a>
        </li>
      </menu>
    </nav>
  );
}
