import clsx from "clsx";
import { getPageModifiedDate } from "@/app/lib/db/getPageModifiedDate";

import styles from "./ModifiedDate.module.css";

type ModifiedDateProps = { pathname?: string; className?: string };

export async function ModifiedDate({ pathname, className }: ModifiedDateProps) {
  const modifiedDate = pathname
    ? await getPageModifiedDate(pathname)
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
