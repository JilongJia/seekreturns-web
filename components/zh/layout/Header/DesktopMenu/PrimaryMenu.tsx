import React from "react";

import { Dropdown } from "./Dropdown";
import { PrimaryMenuItem } from "./PrimaryMenuItem";

import type { PrimaryMenuData } from "../menu.types";

type PrimaryMenuProps = { menuItems: PrimaryMenuData; className?: string };

export function PrimaryMenu({ menuItems, className }: PrimaryMenuProps) {
  return (
    <ul className={className}>
      {menuItems.map((item) => (
        <React.Fragment key={item.id}>
          {item.secondaryMenu && (
            <Dropdown
              id={item.id}
              label={item.label}
              menuItems={item.secondaryMenu}
            />
          )}
          {item.pathname && (
            <PrimaryMenuItem label={item.label} href={item.pathname} />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}
