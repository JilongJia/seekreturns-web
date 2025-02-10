import styles from "./SocialIcons.module.css";

type FacebookIconProps = {
  ariaHidden?: boolean;
  className?: string;
};

type XIconProps = {
  ariaHidden?: boolean;
  className?: string;
};

type EnvelopeIconProps = {
  ariaHidden?: boolean;
  className?: string;
};

type SocialIconsProps = {
  className?: string;
};

function FacebookIcon({ ariaHidden = true, className }: FacebookIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

function XIcon({ ariaHidden = true, className }: XIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function EnvelopeIcon({ ariaHidden = true, className }: EnvelopeIconProps) {
  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

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
            <FacebookIcon className={styles.facebookIcon} />
          </a>
        </li>
        <li>
          <a href="https://x.com/CannyTrading" className={styles.link}>
            <span className={styles.screenReaderText}>
              Visit Canny Trading on X
            </span>
            <XIcon className={styles.xIcon} />
          </a>
        </li>
        <li>
          <a href="mailto:contact@contact.com" className={styles.link}>
            <span className={styles.screenReaderText}>
              Send an email to Canny Trading
            </span>
            <EnvelopeIcon className={styles.envelopeIcon} />
          </a>
        </li>
      </menu>
    </nav>
  );
}
