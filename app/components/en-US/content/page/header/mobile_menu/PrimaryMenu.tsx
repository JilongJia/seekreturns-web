import React from "react";
import clsx from "clsx";
import { type PrimaryMenuData } from "@/app/data/en-US/menu";

import { Dropdown } from "./Dropdown";
import { PrimaryMenuItem } from "./PrimaryMenuItem";
import styles from "./PrimaryMenu.module.css";

type Action = Record<"type", string>;

type PrimaryMenuProps = {
  id: string;
  data: PrimaryMenuData;
  menuStateAndAction: Record<string, { state: boolean; action: Action }>;
  className?: string;
  dispatch: React.Dispatch<Action>;
};

export function PrimaryMenu({
  id,
  data,
  menuStateAndAction,
  className,
  dispatch,
}: PrimaryMenuProps) {
  return (
    <menu id={id} className={clsx(styles.menu, className)}>
      {data.map((primaryMenuItemData) => {
        const { state, action } = menuStateAndAction[
          primaryMenuItemData.id
        ] ?? { state: false, action: { type: "" } };

        return (
          <React.Fragment key={primaryMenuItemData.id}>
            {primaryMenuItemData.secondaryMenuData && (
              <Dropdown
                id={primaryMenuItemData.id}
                label={primaryMenuItemData.label}
                data={primaryMenuItemData.secondaryMenuData}
                isExpanded={state}
                onClick={() => dispatch(action)}
              />
            )}
            {primaryMenuItemData.href && (
              <PrimaryMenuItem
                label={primaryMenuItemData.label}
                href={primaryMenuItemData.href}
              />
            )}
          </React.Fragment>
        );
      })}
    </menu>
  );
}
