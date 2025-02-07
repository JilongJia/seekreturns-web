import clsx from "clsx";

import { type SecondaryMenuData } from "@/app/data/en-US/menu";
import { SecondaryMenuItem } from "./SecondaryMenuItem";
import styles from "./SecondaryMenu.module.css";

type SecondaryMenuProps = {
  id: string;
  data: SecondaryMenuData;
  ariaLabelledby: string;
  className?: string;
};

export function SecondaryMenu({
  id,
  data,
  ariaLabelledby,
  className,
}: SecondaryMenuProps) {
  return (
    <menu
      id={id}
      aria-labelledby={ariaLabelledby}
      className={clsx(styles.menu, className)}
    >
      {data.map((secondaryMenuItemData) => (
        <SecondaryMenuItem
          key={secondaryMenuItemData.id}
          label={secondaryMenuItemData.label}
          href={secondaryMenuItemData.href}
        />
      ))}
    </menu>
  );
}
