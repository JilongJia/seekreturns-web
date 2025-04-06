import clsx from "clsx";
import { getModifiedDate } from "@/app/lib/db/getModifiedDate";

import styles from "./ModifiedDate.module.css";

type ModifiedDateProps = { pathname?: string; className?: string };

export async function ModifiedDate({ pathname, className }: ModifiedDateProps) {
  const modifiedDate = pathname ? await getModifiedDate(pathname) : new Date();
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
