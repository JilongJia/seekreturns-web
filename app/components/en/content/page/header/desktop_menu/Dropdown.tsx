"use client";

import { useState } from "react";
import clsx from "clsx";

import { type SecondaryMenuData } from "@/app/data/en/menu";
import { SecondaryMenu } from "./SecondaryMenu";
import styles from "./Dropdown.module.css";

type DropdownProps = {
  id: string;
  data: SecondaryMenuData;
  label: string;
  className?: string;
};

export function Dropdown({ id, data, label, className }: DropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);
  const handleFocus = () => setIsExpanded(true);
  const handleBlur = () => setIsExpanded(false);

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={clsx(
        styles.dropdown,
        { [styles.expand]: isExpanded },
        className,
      )}
    >
      <button
        id={`${id}-desktop-menu-trigger`}
        aria-expanded={isExpanded}
        aria-haspopup="menu"
        aria-controls={`${id}-desktop-menu`}
        tabIndex={0}
        className={styles.trigger}
      >
        {label}
      </button>
      <SecondaryMenu
        id={`${id}-desktop-menu`}
        data={data}
        ariaLabelledby={`${id}-desktop-menu-trigger`}
        className={clsx(styles.menu, { [styles.expand]: isExpanded })}
      />
    </li>
  );
}
