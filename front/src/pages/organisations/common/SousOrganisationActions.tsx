import { FC, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { SousOrganisationModal } from "./SousOrganisationModal";
import { ICONS } from "pages/common";
import { ResponsableOrganisationModal } from "./ResponsableOrganisationModal";

const MENU = [
  {
    label: "Ajouter sous organisation",
    icon: ICONS.organisation,
    description: "Rattacher une nouvelle sous organisation",
    code: "ajouter_sous_organisation",
  },
  {
    label: "Nommer les responsables",
    icon: ICONS.personne,
    description: "Positionner les responsables des sous organisations",
    code: "nommer",
  },
];

type SousOrganisationActionsProps = {
  organisation: OrganisationResource;
};

export const SousOrganisationActions: FC<SousOrganisationActionsProps> = ({
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
    <div className="ms-1">
      <Dropdown className="ms-2">
        <Dropdown.Toggle variant="primary">Actions</Dropdown.Toggle>
        <Dropdown.Menu className="topbar-dropdown-menu mt-2">
          {MENU.map((item) => (
            <Dropdown.Item
              className="py-2 px-3"
              as="button"
              key={item.code}
              onClick={onSelect(item.code)}
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

      {action === "ajouter_sous_organisation" && (
        <SousOrganisationModal
          closeModal={closeModal}
          organisation={organisation}
        />
      )}

      {action === "nommer" && (
        <ResponsableOrganisationModal
          organisation={organisation}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
