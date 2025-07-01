import clsx from "clsx";
import Link from "next/link";

import styles from "./InternalLink.module.css";

type InternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function InternalLink({ href, children, className }: InternalLinkProps) {
  return (
    <Link href={href} className={clsx(styles.link, className)}>
      {children}
    </Link>
  );
}
