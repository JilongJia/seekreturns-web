import React from "react";
import { type PrimaryMenuData } from "@/app/data/zh/menu";

import { Dropdown } from "./Dropdown";
import { PrimaryMenuItem } from "./PrimaryMenuItem";

type PrimaryMenuProps = { data: PrimaryMenuData; className?: string };

export function PrimaryMenu({ data, className }: PrimaryMenuProps) {
  return (
    <menu className={className}>
      {data.map((primaryMenuItemData) => (
        <React.Fragment key={primaryMenuItemData.id}>
          {primaryMenuItemData.secondaryMenu && (
            <Dropdown
              id={primaryMenuItemData.id}
              label={primaryMenuItemData.label}
              data={primaryMenuItemData.secondaryMenu}
            />
          )}
          {primaryMenuItemData.pathname && (
            <PrimaryMenuItem
              label={primaryMenuItemData.label}
              href={primaryMenuItemData.pathname}
            />
          )}
        </React.Fragment>
      ))}
    </menu>
  );
}
