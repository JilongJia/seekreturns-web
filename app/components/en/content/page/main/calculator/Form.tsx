import clsx from "clsx";

import styles from "./Form.module.css";

type FormProps = { children: React.ReactNode; className?: string };

export function Form({ children, className }: FormProps) {
  return <form className={clsx(styles.form, className)}>{children}</form>;
}
