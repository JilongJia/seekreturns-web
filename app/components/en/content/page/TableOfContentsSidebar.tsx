import {
  TableOfContents,
  type TableOfContentsData,
} from "./table_of_contents_sidebar/TableOfContents";
import styles from "./TableOfContentsSidebar.module.css";

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
