import React from "react";
import { type PrimaryMenuData } from "@/app/data/en-US/menu";

import { Dropdown } from "./Dropdown";
import { PrimaryMenuItem } from "./PrimaryMenuItem";

type PrimaryMenuProps = {
  data: PrimaryMenuData;
  className?: string;
};

export function PrimaryMenu({ data, className }: PrimaryMenuProps) {
  return (
    <menu className={className}>
      {data.map((primaryMenuItemData) => (
        <React.Fragment key={primaryMenuItemData.id}>
          {primaryMenuItemData.secondaryMenuData && (
            <Dropdown
              id={primaryMenuItemData.id}
              label={primaryMenuItemData.label}
              data={primaryMenuItemData.secondaryMenuData}
            />
          )}
          {primaryMenuItemData.href && (
            <PrimaryMenuItem
              label={primaryMenuItemData.label}
              href={primaryMenuItemData.href}
            />
          )}
        </React.Fragment>
      ))}
    </menu>
  );
}
