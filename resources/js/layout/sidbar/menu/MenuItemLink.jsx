import classnames from "classnames";
import { Link } from "react-router-dom";

export const MenuItemLink = ({ item, className }) => {
  return (
    <Link
      to={{ pathname: item.url }}
      target={item.target}
      className={classnames(
        "side-nav-link-ref",
        "side-sub-nav-link",
        className
      )}
      data-menu-key={item.key}
    >
      {item.icon && <i className={item.icon}></i>}
      {item.badge && (
        <span
          className={classnames(
            "badge",
            "bg-" + item.badge.variant,
            "rounded",
            "font-10",
            "float-end",
            {
              "text-dark": item.badge.variant === "light",
              "text-light":
                item.badge.variant === "dark" ||
                item.badge.variant === "secondary",
            }
          )}
        >
          {item.badge.text}
        </span>
      )}
      <span> {item.label} </span>
    </Link>
  );
};
