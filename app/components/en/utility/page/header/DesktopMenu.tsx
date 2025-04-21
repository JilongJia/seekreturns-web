import clsx from "clsx";

import { primaryMenuData, type PrimaryMenuData } from "@/app/data/en/menu";
import { PrimaryMenu } from "./desktop_menu/PrimaryMenu";
import styles from "./DesktopMenu.module.css";

type DesktopMenuProps = { data?: PrimaryMenuData; className?: string };

export function DesktopMenu({
  data = primaryMenuData,
  className,
}: DesktopMenuProps) {
  return (
    <nav aria-label="Main menu" className={clsx(styles.desktopMenu, className)}>
      <PrimaryMenu data={data} className={styles.menu} />
    </nav>
  );
}
