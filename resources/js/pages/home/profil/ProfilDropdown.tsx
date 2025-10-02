import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import useToggle from "hooks/useToggle";
import { useAuth } from "hooks";
import { PersonneAvatar } from "pages/personnes/rechercher/personne/PersonneAvatar";

const ACTIONS = [
  {
    code: "/compte",
    Icon: Icon.Person,
    label: "Mon compte",
    description: "Consulter et gérer mon compte utilisateur",
  },
  {
    code: "/logout",
    Icon: Icon.BoxArrowLeft,
    label: "Deconnexion",
    description: "Se déconnecter de l'application",
  },
];

export const ProfilDropdown = () => {
  const [isOpen, toggleProfil] = useToggle();
  const { user, userDroit } = useAuth();
  return (
    <>
      <Dropdown className="dropdown-profile" show={isOpen} onToggle={toggleProfil}>
        <Dropdown.Toggle
          variant="link"
          as={Link}
          to="#"
          onClick={toggleProfil}
          className="nav-link dropdown-toggle nav-user arrow-none me-0 d-flex"
        >
          <PersonneAvatar photo={user?.personne?.photo} label="TE" />
          <div className="ms-1 d-none d-sm-block">
            <span className="account-user-name">{user?.name}</span>
            <span className="account-position fw-light">
              {userDroit?.isAdmin ? "Admin" : user?.personne?.fonction?.nom}
            </span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu align="start" className="dropdown-menu-animated shadow-lg border-0">
          <div>
            {ACTIONS.map((item, i) => (
              <Link
                to={item.code}
                className={`dropdown-item ${i === ACTIONS.length - 1 ? "" : "border-bottom"}`}
                key={item.code}
              >
                <item.Icon className="me-1" />
                <span>{item.label}</span>
                <span className="text-muted fw-light d-block">{item.description}</span>
              </Link>
            ))}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
