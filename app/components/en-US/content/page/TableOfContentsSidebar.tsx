import { TableOfContents } from "./table_of_contents_sidebar/TableOfContents";
import styles from "./TableOfContentsSidebar.module.css";

type TableOfContentsSidebarProps = {
  className?: string;
};

export function TableOfContentsSidebar({
  className,
}: TableOfContentsSidebarProps) {
  return (
    <aside className={className}>
      <TableOfContents className={styles.tableOfContents} />
    </aside>
  );
}
