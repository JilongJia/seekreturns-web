import { SiYoutube, SiX } from "react-icons/si";
import { LuMail } from "react-icons/lu";

import styles from "./SocialIcons.module.css";

type SocialIconsProps = { className?: string };

export function SocialIcons({ className }: SocialIconsProps) {
  return (
    <nav aria-label="社交媒体链接" className={className}>
      <ul className={styles.menu}>
        <li>
          <a
            href="https://www.youtube.com/@SeekReturnsOfficial"
            className={styles.link}
          >
            <span className={styles.screenReaderText}>
              在 YouTube 上访问 Seek Returns
            </span>
            <SiYoutube aria-hidden={true} className={styles.icon} />
          </a>
        </li>
        <li>
          <a href="https://x.com/SeekReturns" className={styles.link}>
            <span className={styles.screenReaderText}>
              在 X 上访问 Seek Returns
            </span>
            <SiX aria-hidden={true} className={styles.icon} />
          </a>
        </li>
        <li>
          <a href="mailto:contact@seekreturns.com" className={styles.link}>
            <span className={styles.screenReaderText}>
              发送电子邮件到 Seek Returns
            </span>
            <LuMail aria-hidden={true} className={styles.icon} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
