import { AddAttributionOrganisationModal } from "pages/attributions/common/AttributionOrganisationModal";
import { FC, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";

type OrganisationMembreActionsProps = {
  organisation: OrganisationResource;
};

const ACTIONS = [
  {
    label: "Ajouter membre",
    icon: "uil-plus",
    description: "Affecter un membre dans l'organe de direction",
    code: "ajouter_membre",
  },
  {
    label: "Exporter",
    icon: "uil-down-arrow",
    description: "Exporter les membres au format EXCEL",
    code: "exporter_membre",
  },
];

export const OrganisationMembreActions: FC<OrganisationMembreActionsProps> = ({
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
      {action === "ajouter_membre" && (
        <AddAttributionOrganisationModal
          closeModal={closeModal}
          organisation={organisation}
        />
      )}
    </>
  );
};
