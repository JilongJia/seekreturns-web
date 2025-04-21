import clsx from "clsx";
import { LuChevronUp, LuChevronDown } from "react-icons/lu";

import { type SecondaryMenuData } from "@/app/data/en/menu";
import { SecondaryMenu } from "./SecondaryMenu";
import styles from "./Dropdown.module.css";

type DropdownProps = {
  id: string;
  data: SecondaryMenuData;
  label: string;
  isExpanded: boolean;
  className?: string;
  onClick: () => void;
};

export function Dropdown({
  id,
  data,
  label,
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
        data={data}
        ariaLabelledby={`${id}-mobile-menu-trigger`}
        className={clsx(styles.menu, { [styles.expand]: isExpanded })}
      />
    </li>
  );
}
