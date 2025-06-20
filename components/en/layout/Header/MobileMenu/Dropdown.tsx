import clsx from "clsx";
import { LuChevronUp, LuChevronDown } from "react-icons/lu";

import { SecondaryMenu } from "./SecondaryMenu";

import type { SecondaryMenuData } from "../menu.types";
import styles from "./Dropdown.module.css";

type DropdownProps = {
  id: string;
  label: string;
  menuItems: SecondaryMenuData;
  isExpanded: boolean;
  className?: string;
  onClick: () => void;
};

export function Dropdown({
  id,
  label,
  menuItems,
  isExpanded,
  className,
  onClick,
}: DropdownProps) {
  return (
    <li className={className}>
      <button
        id={`${id}-mobile-menu-trigger`}
        className={clsx(styles.button, { [styles.expand]: isExpanded })}
        onClick={onClick}
        aria-expanded={isExpanded}
        aria-haspopup="menu"
        aria-controls={`${id}-mobile-menu`}
      >
        <span>{label}</span>
        {isExpanded ? (
          <LuChevronUp aria-hidden={true} className={styles.icon} />
        ) : (
          <LuChevronDown aria-hidden={true} className={styles.icon} />
        )}
      </button>
      <SecondaryMenu
        id={`${id}-mobile-menu`}
        menuItems={menuItems}
        ariaLabelledby={`${id}-mobile-menu-trigger`}
        className={clsx(styles.menu, { [styles.expand]: isExpanded })}
      />
    </li>
  );
}
