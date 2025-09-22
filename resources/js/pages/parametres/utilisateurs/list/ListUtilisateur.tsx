import { PersonneAvatar } from "pages/personnes/rechercher/personne/PersonneAvatar";
import { FC } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserResource } from "types/auth.type";
import { LINKS } from "utils/links";
import * as Icon from "react-bootstrap-icons";

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
          to={`${LINKS.parametres.utilisateurs}/${user.id}`}
          key={user.id}
          className="d-flex justify-content-between align-items-start px-2 px-sm-4"
        >
          <div className="avatar-sm me-1">
            <PersonneAvatar label="US" photo={user.personne?.photo} />
          </div>
          <div className="ms-2 me-auto align-self-center">
            <Link to={LINKS.parametres.viewUtilisateur(user.id)} className="fw-semibold fs-5 text-black">
              {user.name}
            </Link>
            <span className="fs-6 fw-light d-block">{user.email}</span>
            {user.roles &&
              user.roles.map((role) => (
                <div key={role.id} className="fs-6 text-muted fw-light">
                  {role.nom}
                </div>
              ))}
            {!user.verify && <Badge bg="danger">Email non vérifié</Badge>}
          </div>
          <Button
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            as={Link}
            to={LINKS.parametres.viewUtilisateur(user.id)}
            variant="default"
          >
            <Icon.ArrowRight />
          </Button>
        </ListGroup.Item>
      ))}
    </>
  );
};
