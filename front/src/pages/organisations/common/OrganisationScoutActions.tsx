import { AffecterScoutModal } from "pages/attributions/common";
import { ScoutModal } from "pages/personnes/modal";
import { FC, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";

type OrganisationScoutActionsProps = {
  organisation: OrganisationResource;
};

const ACTIONS = [
  {
    label: "Scout existant",
    icon: "uil-link",
    description: "Choisir un scout existant et l'ajouter à l'unité",
    code: "affecter_scout",
  },
  {
    label: "Nouveau scout",
    icon: "uil-user-plus",
    description: "Créer un nouveau scout qui sera ajouté à l'unité",
    code: "ajouter_scout",
  },
];

export const OrganisationScoutActions: FC<OrganisationScoutActionsProps> = ({
  organisation,
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
        <Dropdown.Toggle as={Button} variant="secondary">
          Ajouter
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

      {action === "ajouter_scout" && (
        <ScoutModal closeModal={closeModal} organisation={organisation} />
      )}

      {action === "affecter_scout" && (
        <AffecterScoutModal closeModal={closeModal} unite={organisation} />
      )}
    </>
  );
};
