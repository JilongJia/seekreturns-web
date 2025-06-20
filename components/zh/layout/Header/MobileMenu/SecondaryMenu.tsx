import { SecondaryMenuItem } from "./SecondaryMenuItem";

import type { SecondaryMenuData } from "../menu.types";

type SecondaryMenuProps = {
  id: string;
  menuItems: SecondaryMenuData;
  ariaLabelledby: string;
  className?: string;
};

export function SecondaryMenu({
  id,
  menuItems,
  ariaLabelledby,
  className,
}: SecondaryMenuProps) {
  return (
    <ul id={id} aria-labelledby={ariaLabelledby} className={className}>
      {menuItems.map((item) => (
        <SecondaryMenuItem
          key={item.id}
          label={item.label}
          href={item.pathname}
        />
      ))}
    </ul>
  );
}
