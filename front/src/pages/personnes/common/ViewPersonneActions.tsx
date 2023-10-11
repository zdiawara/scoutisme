import { FC, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ScoutModal } from "../modal";
import { OrganisationResource } from "types/organisation.type";
import { AffecterPersonneModal } from "pages/attributions/common";
import { PersonneResource } from "types/personne.type";

type ViewPersonneActionsProps = {
  personne: PersonneResource;
};

const ACTIONS = [
  {
    label: "Affecter",
    icon: "uil-link",
    description: "Affecter la personne à une organisation",
    code: "affecter",
  },
  {
    label: "Carte adhésion",
    icon: "uil-down-arrow",
    description: "Telecharger la carte d'adhésion",
    code: "adhesion",
  },
  {
    label: "Désactiver",
    icon: "uil-padlock",
    description: "Désactiver la personne",
    code: "inactif",
  },
];

export const ViewPersonneActions: FC<ViewPersonneActionsProps> = ({
  personne,
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
        <Dropdown.Toggle variant="secondary">Actions</Dropdown.Toggle>
        <Dropdown.Menu className="topbar-dropdown-menu mt-2">
          {ACTIONS.map((item) => (
            <Dropdown.Item
              className="py-2 px-3"
              onClick={onSelect(item.code)}
              key={item.code}
            >
              <i className={`${item.icon} text-black me-2`}></i>
              <span className="text-primary fs-5 fw-semibold">
                {item.label}
              </span>
              <div className="text-muted">{item.description}</div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {action === "ajouter_scout" && (
        <ScoutModal
          closeModal={closeModal}
          organisation={{} as OrganisationResource}
        />
      )}
      {action === "affecter" && (
        <AffecterPersonneModal closeModal={closeModal} personne={personne} />
      )}
    </>
  );
};
