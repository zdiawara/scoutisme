import { Link } from "react-router-dom";
import { LINKS, changeBodyAttribute, getMenuItems } from "../../utils";
import SimpleBar from "simplebar-react";
// import logoDark from "../../assets/images/logo-dark.png";
// import logoSm from "../..assets/images/logo_sm.png";
// import logo from "../..assets/images/logo.png";

import { useEffect, useRef } from "react";
import { Menu } from "./menu";

const MENU = [
  {
    title: "Personnes",
    link: LINKS.personnes.base,
  },
  {
    title: "Organisations",
    link: LINKS.organisations.base,
  },
  {
    title: "Roles",
    link: LINKS.roles.base,
  },
];

// export type MenuItemType = {
//   key: string;
//   label: string;
//   isTitle?: boolean;
//   icon?: string;
//   url?: string;
//   badge?: {
//     variant: string;
//     text: string;
//   };
//   parentKey?: string;
//   target?: string;
//   children?: MenuItemType[];
// };

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
        {/* <>
          <Link to="/" className="logo text-center logo-light">
            <span className="logo-lg">
              <img src={isLight ? logoDark : logo} alt="logo" height="16" />
            </span>
            <span className="logo-sm">
              <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="16" />
            </span>
          </Link>

          <Link to="/" className="logo text-center logo-dark">
            <span className="logo-lg">
              <img src={isLight ? logoDark : logo} alt="logo" height="16" />
            </span>
            <span className="logo-sm">
              <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="16" />
            </span>
          </Link>
        </> */}

        <SimpleBar
          style={{ maxHeight: "100%" }}
          timeout={500}
          scrollbarMaxSize={320}
        >
          <Menu menuItems={getMenuItems()} />
        </SimpleBar>
      </div>
    </>
  );
};
