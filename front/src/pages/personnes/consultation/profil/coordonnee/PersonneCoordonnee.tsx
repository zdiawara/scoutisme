import { FC } from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { View } from "components";
import { PersonneResource } from "types/personne.type";
import useToggle from "hooks/useToggle";
import { ViewPersonneCoordonnee } from "./ViewPersonneCoordonnee";
import { EditPersonneCoordonnee } from "./EditPersonneCoordonnee";

type PersonneCoordonneeProps = {
  personne: PersonneResource;
};

export const PersonneCoordonnee: FC<PersonneCoordonneeProps> = ({
  personne,
}) => {
  const [show, toggleForm] = useToggle();
  return (
    <>
      <View.Toolbar
        icon={<Icon.Telephone size="1.1rem" className="me-1" />}
        label="Coordonnnées"
        right={
          <Button
            size="sm"
            variant="secondary"
            onClick={() => toggleForm()}
            disabled={show}
          >
            <Icon.Pencil />
          </Button>
        }
      />
      {show ? (
        <EditPersonneCoordonnee
          personne={personne}
          onClose={() => toggleForm()}
          key="edit"
        />
      ) : (
        <ViewPersonneCoordonnee personne={personne} key="view" />
      )}
    </>
  );
};
