import { TableOfContents } from "./TableOfContents";

import styles from "./TableOfContentsSidebar.module.css";
import type { TableOfContentsData } from "./tableOfContents.types";

type TableOfContentsSidebarProps = {
  tableOfContents: TableOfContentsData;
  className?: string;
};

export function TableOfContentsSidebar({
  tableOfContents,
  className,
}: TableOfContentsSidebarProps) {
  return (
    <aside className={className}>
      <TableOfContents
        data={tableOfContents}
        className={styles.tableOfContents}
      />
    </aside>
  );
}
