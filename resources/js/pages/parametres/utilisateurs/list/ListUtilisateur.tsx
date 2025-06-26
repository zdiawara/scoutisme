import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserResource } from "types/auth.type";
import { LINKS } from "utils/links";

type Props = {
  users?: UserResource[];
};

export const ListUtilisateur: FC<Props> = ({ users }) => {
  if (!users?.length) {
    return <ListGroup.Item className="text-center text-muted">Aucun utilisateur trouvé</ListGroup.Item>;
  }

  return (
    <>
      {users.map((user) => (
        <ListGroup.Item
          as={Link}
          to={`${LINKS.parametres}/${user.id}`}
          key={user.id}
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto align-self-center">
            <Link to={`${LINKS.parametres.utilisateurs}/${user.id}`} className="fw-semibold fs-5 text-black">
              {user.name}
            </Link>
            <span className="ms-1 fs-6 fw-light">{user.email}</span>
            {user.role && <div className="fw-light text-muted mt-1">{user.role.nom}</div>}
          </div>
        </ListGroup.Item>
      ))}
    </>
  );
};
