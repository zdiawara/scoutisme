import { MES_INFORMATIONS, getMenuItems } from "../../utils";

import { useMemo, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { UserResource } from "types/auth.type";
import SimpleBar from "simplebar-react";
import { Menu } from "./menu";

// const NATURE: Record<string, string> = {
//   region: "Ma région",
//   unite: "Mon unité",
//   groupe: "Mon groupe",
// };

export const Sidebar = () => {
  const menuNodeRef = useRef(null);

  const query = useQueryClient();

  const menus = useMemo(() => {
    const { data: user } = query.getQueryData(["user-info"]) as {
      data: UserResource;
    };

    const { personne } = user;

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

    const menus = getMenuItems().filter(
      (menu) => menu.isTitle || modules.includes(menu.key)
    );

    if (personne && personne.organisation) {
      // const { nature, nom } = personne.organisation;
      const infos = MES_INFORMATIONS.map((item) =>
        item.key === "organisation"
          ? {
              ...item,
              label: "Mon organisation", //NATURE[nature.code] || nom,
            }
          : item
      );
      return [...infos, ...menus].filter((e) => e.key !== "organisations");
    }
    return menus;
  }, [query]);

  return (
    <div className="leftside-menu" ref={menuNodeRef}>
      <SimpleBar style={{ maxHeight: "100%" }} scrollbarMaxSize={320}>
        <Menu menuItems={menus} />
      </SimpleBar>
    </div>
  );
};
