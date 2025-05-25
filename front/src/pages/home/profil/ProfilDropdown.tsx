import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import d from "../../../assets/images/users/avatar-1.jpg";
import useToggle from "hooks/useToggle";
import { useAuth } from "hooks";

const ACTIONS = [
  {
    code: "/compte",
    Icon: Icon.PersonCircle,
    label: "Mon compte",
  },
  {
    code: "/aide",
    Icon: Icon.InfoCircle,
    label: "Support",
  },
  {
    code: "/logout",
    Icon: Icon.BoxArrowLeft,
    label: "Deconnexion",
  },
];

export const ProfilDropdown = () => {
  const [isOpen, toggleProfil] = useToggle();
  const { user } = useAuth();
  return (
    <>
      <Dropdown
        className="dropdown-profile"
        show={isOpen}
        onToggle={toggleProfil}
      >
        <Dropdown.Toggle
          variant="link"
          // id="dropdown-profile"
          as={Link}
          to="#"
          onClick={toggleProfil}
          className="nav-link dropdown-toggle nav-user arrow-none me-0 d-flex"
        >
          <div className="account-user-avatar">
            <img src={d} className="rounded-circle" alt="user" />
          </div>
          <div className="ms-1 d-none d-sm-block">
            <span className="account-user-name">{user?.name}</span>
            <span className="account-position fw-light">{user?.role?.nom}</span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu
          align={"end"}
          className="dropdown-menu-animated shadow-lg border-0"
        >
          <div onClick={() => {}}>
            {ACTIONS.map((item) => {
              return (
                <Link to={item.code} className="dropdown-item" key={item.code}>
                  <item.Icon className="me-2" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
