import classNames from "classnames";
/* import ProfileDropdown from "./ProfileDropdown";
import userImage from "assets/images/users/avatar-1.jpg";
import { ProfileOption } from "layout/types"; */

// get the profilemenu
/* const profileMenus: ProfileOption[] = [
  {
    label: "My Account",
    icon: "mdi mdi-account-circle",
    redirectTo: "#",
  },
  {
    label: "Settings",
    icon: "mdi mdi-account-edit",
    redirectTo: "#",
  },
  {
    label: "Support",
    icon: "mdi mdi-lifebuoy",
    redirectTo: "#",
  },
  {
    label: "Lock Screen",
    icon: "mdi mdi-lock-outline",
    redirectTo: "/account/lock-screen",
  },
  {
    label: "Logout",
    icon: "mdi mdi-logout",
    redirectTo: "/account/logout",
  },
]; */

type TopbarProps = {
  hideLogo?: boolean;
  navCssClasses?: string;
  openLeftMenuCallBack?: () => void;
  topbarDark?: boolean;
};

export const Header = ({
  hideLogo,
  navCssClasses,
  openLeftMenuCallBack,
  topbarDark,
}: TopbarProps) => {
  const containerCssClasses = !hideLogo ? "container-fluid" : "";

  return (
    <>
      <div className={classNames("navbar-custom", navCssClasses)}>
        <div className={containerCssClasses}>
          <ul className="list-unstyled topbar-menu float-end mb-0">
            <li className="dropdown notification-list">
              {/* <ProfileDropdown
                userImage={userImage}
                menuItems={profileMenus}
                username={"Dominic Keller"}
                userTitle={"Founder"}
              /> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
