import { changeBodyAttribute, getMenuItems } from "../../utils";
import SimpleBar from "simplebar-react";

import { useEffect, useRef } from "react";
import { Menu } from "./menu";

export const Sidebar = () => {
  const menuNodeRef = useRef(null);

  /*
   * layout defaults
   */
  useEffect(() => {
    changeBodyAttribute("data-layout", "vertical");
    changeBodyAttribute("data-layout-color", "light");
    // changeBodyAttribute("data-layout-mode", layoutWidth);
    changeBodyAttribute("data-leftbar-theme", "dark");
    // changeBodyAttribute("data-leftbar-compact-mode", leftSideBarType);
  }, []);

  return (
    <>
      <div className="leftside-menu" ref={menuNodeRef}>
        <SimpleBar style={{ maxHeight: "100%" }} scrollbarMaxSize={320}>
          <Menu menuItems={getMenuItems()} />
        </SimpleBar>
      </div>
    </>
  );
};
