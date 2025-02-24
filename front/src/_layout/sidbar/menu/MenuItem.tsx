import classNames from "classnames";
import { MenuItemLink } from "./MenuItemLink";
import { SubMenus } from "./types";

export const MenuItem = ({ item, className, linkClassName }: SubMenus) => {
  return (
    <li className={classNames("side-nav-item", className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};
