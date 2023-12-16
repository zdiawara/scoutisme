import { changeBodyAttribute, getMenuItems } from "../../utils";
import SimpleBar from "simplebar-react";

import { useEffect, useMemo, useRef } from "react";
import { Menu } from "./menu";
import { useQueryClient } from "@tanstack/react-query";
import { UserResource } from "types/auth.type";

export const Sidebar = () => {
  const menuNodeRef = useRef(null);

  const query = useQueryClient();

  const menus = useMemo(() => {
    const { data: user } = query.getQueryData(["user-info"]) as {
      data: UserResource;
    };

    if (user.role.code === "admin") {
      return getMenuItems();
    }

    const allModuleParents = user.fonctionnalites
      .filter((e) => Boolean(e.module.parent))
      .map((e) => e.module.parent);

    const modules = allModuleParents
      .filter((module, index) => {
        return (
          index === allModuleParents.findIndex((o) => module?.id === o?.id)
        );
      })
      .map((e) => e?.code || "");

    console.log(
      user.fonctionnalites.reduce((prev, curr) => {
        if (prev[curr.module.code]) {
          prev[curr.module.code].push(curr.code);
        } else {
          prev[curr.module.code] = [curr.code];
        }
        return prev;
      }, {} as Record<string, string[]>)
    );

    return getMenuItems().filter((menu) => modules.includes(menu.key));
  }, [query]);

  console.log(menus);
  /*
   * layout defaults
   */
  useEffect(() => {
    changeBodyAttribute("data-layout", "vertical");
    changeBodyAttribute("data-layout-color", "light");
    // changeBodyAttribute("data-layout-mode", layoutWidth);
    changeBodyAttribute("data-leftbar-theme", "light");
    // changeBodyAttribute("data-leftbar-compact-mode", leftSideBarType);
  }, []);

  return (
    <>
      <div className="leftside-menu" ref={menuNodeRef}>
        <SimpleBar style={{ maxHeight: "100%" }} scrollbarMaxSize={320}>
          <Menu menuItems={menus} />
        </SimpleBar>
      </div>
    </>
  );
};
