import clsx from "clsx";

import { primaryMenu, type PrimaryMenuData } from "@/app/data/zh/menu";
import { PrimaryMenu } from "./desktop_menu/PrimaryMenu";
import styles from "./DesktopMenu.module.css";

type DesktopMenuProps = { data?: PrimaryMenuData; className?: string };

export function DesktopMenu({
  data = primaryMenu,
  className,
}: DesktopMenuProps) {
  return (
    <nav aria-label="主菜单" className={clsx(styles.desktopMenu, className)}>
      <PrimaryMenu data={data} className={styles.menu} />
    </nav>
  );
}
