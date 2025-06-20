import clsx from "clsx";
import React from "react";

import { Dropdown } from "./Dropdown";
import { PrimaryMenuItem } from "./PrimaryMenuItem";

import type { PrimaryMenuData } from "../menu.types";
import styles from "./PrimaryMenu.module.css";

type PrimaryMenuProps = {
  id: string;
  menuItems: PrimaryMenuData;
  menuStateAndAction: Record<string, { state: boolean; action: Action }>;
  className?: string;
  dispatch: React.Dispatch<Action>;
};

type Action = Record<"type", string>;

export function PrimaryMenu({
  id,
  menuItems,
  menuStateAndAction,
  className,
  dispatch,
}: PrimaryMenuProps) {
  return (
    <ul id={id} className={clsx(styles.menu, className)}>
      {menuItems.map((item) => {
        const { state, action } = menuStateAndAction[item.id] ?? {
          state: false,
          action: { type: "" },
        };

        return (
          <React.Fragment key={item.id}>
            {item.secondaryMenu && (
              <Dropdown
                id={item.id}
                label={item.label}
                menuItems={item.secondaryMenu}
                isExpanded={state}
                onClick={() => dispatch(action)}
              />
            )}
            {item.pathname && (
              <PrimaryMenuItem label={item.label} href={item.pathname} />
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
}
