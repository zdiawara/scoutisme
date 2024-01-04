import { FC, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FonctionResource } from "types/personne.type";
import { OrganisationMembreModal } from "./OrganisationMembreModal";
import { OrganisationResource } from "types/organisation.type";

type AffecterActionsProps = {
  /* attribution: AttributionResource; */
  fonction: FonctionResource;
  organisation: OrganisationResource;
};

const ACTIONS = [
  /*   {
    label: "Modifier",
    icon: "uil-edit-alt",
    description: "Mettre à jour les informations de l'affectation",
    code: "modifier",
  }, */
  {
    label: "Affecter",
    icon: "uil-link",
    description: "Associée une personne existante à cette fonction",
    code: "affecter",
  },
  {
    label: "Nouveau",
    icon: "uil-user-plus",
    description: "Ajouter une nouvelle personne et l'affecter",
    code: "ajouter",
  },
];

export const AffecterActions: FC<AffecterActionsProps> = ({
  organisation,
  fonction,
}) => {
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
              //disabled={!attribution.id}
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

      {action === "affecter" && (
        <OrganisationMembreModal
          fonction={fonction}
          organisation={organisation}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
