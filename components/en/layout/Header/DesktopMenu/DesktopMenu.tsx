import clsx from "clsx";

import { PrimaryMenu } from "./PrimaryMenu";

import type { PrimaryMenuData } from "../menu.types";
import styles from "./DesktopMenu.module.css";

type DesktopMenuProps = { menuItems: PrimaryMenuData; className?: string };

export function DesktopMenu({ menuItems, className }: DesktopMenuProps) {
  return (
    <nav aria-label="Main menu" className={clsx(styles.desktopMenu, className)}>
      <PrimaryMenu menuItems={menuItems} className={styles.menu} />
    </nav>
  );
}
