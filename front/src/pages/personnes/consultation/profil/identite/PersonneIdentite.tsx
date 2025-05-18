import { FC } from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { View } from "components";
import { PersonneResource } from "types/personne.type";
import { PersonneIdentiteView } from "./PersonneIdentiteView";
import { PersonneIdentiteEdit } from "./PersonneIdentiteEdit";
import useToggle from "hooks/useToggle";

type PersonneIdentiteProps = {
  personne: PersonneResource;
};

export const PersonneIdentite: FC<PersonneIdentiteProps> = ({ personne }) => {
  const [show, toggleForm] = useToggle();
  return (
    <>
      <View.Toolbar
        icon={<Icon.InfoCircle size="1.1rem" className="me-1" />}
        label="Identite"
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
        <PersonneIdentiteEdit
          personne={personne}
          onClose={() => toggleForm()}
          key="edit"
        />
      ) : (
        <PersonneIdentiteView personne={personne} key="view" />
      )}
    </>
  );
};
