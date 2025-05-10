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
      更新于{" "}
      <time dateTime={modifiedDate.toISOString()}>
        {modifiedDate.toLocaleDateString("zh", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </span>
  );
}
