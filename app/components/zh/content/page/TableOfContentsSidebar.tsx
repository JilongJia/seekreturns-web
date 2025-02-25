import {
  TableOfContents,
  type TableOfContentsData,
} from "./table_of_contents_sidebar/TableOfContents";
import styles from "./TableOfContentsSidebar.module.css";

type TableOfContentsSidebarProps = {
  tableOfContentsData: TableOfContentsData;
  className?: string;
};

export function TableOfContentsSidebar({
  tableOfContentsData,
  className,
}: TableOfContentsSidebarProps) {
  return (
    <aside className={className}>
      <TableOfContents
        data={tableOfContentsData}
        className={styles.tableOfContents}
      />
    </aside>
  );
}
