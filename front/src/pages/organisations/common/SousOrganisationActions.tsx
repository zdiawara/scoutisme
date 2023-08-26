import { FC, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { SousOrganisationModal } from "./SousOrganisationModal";

type SousOrganisationActionsProps = {
  organisation: OrganisationResource;
};

const ACTIONS = [
  {
    label: "Ajouter sous orga.",
    icon: "uil-plus",
    description: "Rattacher une sous organisation",
    code: "ajouter_sous_organisation",
  },
  {
    label: "Exporter",
    icon: "uil-down-arrow",
    description: "Exporter les organisations au format excel",
    code: "exporter_organisation",
  },
];

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
    <>
      <Dropdown className="ms-2">
        <Dropdown.Toggle variant="secondary">Actions</Dropdown.Toggle>
        <Dropdown.Menu className="topbar-dropdown-menu mt-2">
          {ACTIONS.map((item) => (
            <Dropdown.Item
              as="button"
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
      {action === "ajouter_sous_organisation" && (
        <SousOrganisationModal
          closeModal={closeModal}
          organisation={organisation}
        />
      )}
    </>
  );
};
