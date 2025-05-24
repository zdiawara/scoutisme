import { FC } from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { View } from "components";
import { PersonneResource } from "types/personne.type";
import useToggle from "hooks/useToggle";
import { ViewPersonneCoordonnee } from "./ViewPersonneCoordonnee";
import { EditPersonneCoordonnee } from "./EditPersonneCoordonnee";
import { useDroits } from "hooks/useDroits";

type PersonneCoordonneeProps = {
  personne: PersonneResource;
};

export const PersonneCoordonnee: FC<PersonneCoordonneeProps> = ({
  personne,
}) => {
  const [show, toggleForm] = useToggle();
  const droits = useDroits();
  return (
    <>
      <View.Toolbar
        icon={<Icon.Telephone size="1.2rem" className="me-1" />}
        label="Coordonnnées"
        right={
          droits.personne.modifier(personne) && (
            <Button
              variant="secondary"
              onClick={() => toggleForm()}
              disabled={show}
            >
              <Icon.Pencil />
            </Button>
          )
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
