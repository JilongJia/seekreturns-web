import clsx from "clsx";
import { fetchPageModifiedDate } from "@/app/lib/db/fetchPageModifiedDate";

import styles from "./ModifiedDate.module.css";

type ModifiedDateProps = { pathname?: string; className?: string };

export async function ModifiedDate({ pathname, className }: ModifiedDateProps) {
  const modifiedDate = pathname
    ? await fetchPageModifiedDate(pathname)
    : new Date();
  if (!modifiedDate) return null;

  return (
    <span className={clsx(styles.modifiedDate, className)}>
      Updated{" "}
      <time dateTime={modifiedDate.toISOString()}>
        {modifiedDate.toLocaleDateString("en", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </span>
  );
}
