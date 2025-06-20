"use client";

import clsx from "clsx";
import { useState } from "react";

import { SecondaryMenu } from "./SecondaryMenu";

import type { SecondaryMenuData } from "../menu.types";
import styles from "./Dropdown.module.css";

type DropdownProps = {
  id: string;
  label: string;
  menuItems: SecondaryMenuData;
  className?: string;
};

export function Dropdown({ id, label, menuItems, className }: DropdownProps) {
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
        menuItems={menuItems}
        ariaLabelledby={`${id}-desktop-menu-trigger`}
        className={clsx(styles.menu, { [styles.expand]: isExpanded })}
      />
    </li>
  );
}
