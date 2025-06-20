import clsx from "clsx";

import { SecondaryMenuItem } from "./SecondaryMenuItem";

import type { SecondaryMenuData } from "../menu.types";
import styles from "./SecondaryMenu.module.css";

type SecondaryMenuProps = {
  id: string;
  menuItems: SecondaryMenuData;
  ariaLabelledby: string;
  className?: string;
};

export function SecondaryMenu({
  id,
  menuItems,
  ariaLabelledby,
  className,
}: SecondaryMenuProps) {
  return (
    <ul
      id={id}
      aria-labelledby={ariaLabelledby}
      className={clsx(styles.menu, className)}
    >
      {menuItems.map((item) => (
        <SecondaryMenuItem
          key={item.id}
          label={item.label}
          href={item.pathname}
        />
      ))}
    </ul>
  );
}
