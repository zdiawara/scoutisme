import { FC, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { CreateUserFromPersonneModal } from "../modal/CreateUserFromPersonneModal";

type PersonneActionsProps = {
  personne: PersonneResource;
};

const ACTIONS = [
  /*   {
    label: "Modifier",
    icon: "uil-edit-alt",
    description: "Mettre à jour les informations de l'affectation",
    code: "modifier",
  }, */
  {
    label: "Convertir",
    icon: "uil-user",
    description: "Transformer la personne en utilisateur",
    code: "convertir",
  },
];

export const PersonneActions: FC<PersonneActionsProps> = ({ personne }) => {
  const [action, setAction] = useState<string | undefined>();

  const onSelect = (code: string) => () => {
    setAction(code);
  };

  const closeModal = () => {
    setAction(undefined);
  };

  return (
    <>
      <Dropdown className="ms-2">
        <Dropdown.Toggle as={Button} variant="light" className="arrow-none">
          <i className="mdi mdi-dots-vertical" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="topbar-dropdown-menu mt-2">
          {ACTIONS.map((item) => (
            <Dropdown.Item
              as="button"
              className="py-2 px-3"
              onClick={onSelect(item.code)}
              key={item.code}
              disabled={!personne.id}
            >
              <i className={`${item.icon} text-primary me-2`}></i>
              <span className="text-primary fs-5 fw-semibold">
                {item.label}
              </span>
              <div className="text-muted fw-semibold">{item.description}</div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {action === "convertir" && (
        <CreateUserFromPersonneModal
          closeModal={closeModal}
          personne={personne}
        />
      )}
    </>
  );
};
