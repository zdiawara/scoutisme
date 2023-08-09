import classNames from "classnames";
import { MenuItemLink } from "./MenuItemLink";

export const MenuItem = ({ item, className, linkClassName }) => {
  return (
    <li className={classNames("side-nav-item", className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};
