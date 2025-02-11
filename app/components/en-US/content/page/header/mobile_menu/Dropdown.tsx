import clsx from "clsx";

import { type SecondaryMenuData } from "@/app/data/en-US/menu";
import { SecondaryMenu } from "./SecondaryMenu";
import styles from "./Dropdown.module.css";

type ArrowIconProps = { ariaHidden?: boolean; className?: string };

type DropdownProps = {
  id: string;
  data: SecondaryMenuData;
  label: string;
  isExpanded: boolean;
  className?: string;
  onClick: () => void;
};

function ArrowDropUpIcon({ ariaHidden = true, className }: ArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 14l5-5 5 5z" />
    </svg>
  );
}

function ArrowDropDownIcon({ ariaHidden = true, className }: ArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
}

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
          <ArrowDropUpIcon className={styles.icon} />
        ) : (
          <ArrowDropDownIcon className={styles.icon} />
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
