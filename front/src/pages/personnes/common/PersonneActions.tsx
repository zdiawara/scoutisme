import { FC, forwardRef, Fragment, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { PersonneResource } from "types/personne.type";
import { CreateUserFromPersonneModal } from "../modal/CreateUserFromPersonneModal";
import { Eye, EyeFill, ThreeDotsVertical } from "react-bootstrap-icons";
import * as Icon from "react-bootstrap-icons";

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
    label: "Consulter",
    icon: "uil-user",
    description: "Voir la fiche de la personne",
    code: "consulter",
    Icon: Icon.Eye,
  },
  {
    label: "Carte adhésion",
    icon: "uil-user",
    description: "Telecharger la carte d'adhésion",
    code: "carte",
    Icon: Icon.Download,
  },
  {
    label: "Cotisation",
    icon: "uil-user",
    description: "Payer la cotisation",
    code: "carte",
    Icon: Icon.Send,
  },
  {
    label: "Convertir",
    icon: "uil-user",
    description: "Transformer en utilisateur",
    code: "convertir",
    Icon: Icon.PersonAdd,
  },
];

const CustomToggle = forwardRef(({ onClick }: any, ref) => (
  <Button
    // @ts-ignore
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    size="sm"
    variant="default"
  >
    <ThreeDotsVertical />
  </Button>
));

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
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className="topbar-dropdown-menu shadow-lg">
          {ACTIONS.map((item, i) => (
            <Fragment key={item.code}>
              <Dropdown.Item
                as="button"
                className="px-3"
                onClick={onSelect(item.code)}
                disabled={!personne.id}
              >
                <item.Icon size="1.1rem" className="me-1" />
                <span className="fw-semibold">{item.label}</span>
                <div className="fw-light text-muted">{item.description}</div>
              </Dropdown.Item>
              {i + 1 !== ACTIONS.length && <Dropdown.Divider />}
            </Fragment>
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
