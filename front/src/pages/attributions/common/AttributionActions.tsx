import { FC, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { EditAttributionOrganisationModal } from "./AttributionOrganisationModal";
import { AttributionResource } from "types/personne.type";
import { CloturerAttribution } from "./CloturerAttribution";
import { SupprimerAttribution } from "./SupprimerAttribution";

type AttributionActionsProps = {
  attribution: AttributionResource;
};

const ACTIONS = [
  {
    label: "Modifier",
    icon: "uil-edit-alt",
    description: "Mettre à jour les informations de l'affectation",
    code: "modifier",
  },
  {
    label: "Cloturer",
    icon: "uil-multiply",
    description: "Mettre fin à la fonction du membre",
    code: "cloturer",
  },
  {
    label: "Supprimer",
    icon: "uil-trash-alt",
    description: "Effacer completement la fonction du membre",
    code: "supprimer",
  },
];

export const AttributionActions: FC<AttributionActionsProps> = ({
  attribution,
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
        <Dropdown.Toggle
          as={Button}
          size="sm"
          variant="outline-light"
          className="arrow-none card-drop"
        >
          <i className="mdi mdi-dots-vertical" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="topbar-dropdown-menu mt-2">
          {ACTIONS.map((item) => (
            <Dropdown.Item
              as="button"
              className="py-2 px-3"
              onClick={onSelect(item.code)}
              key={item.code}
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
      {action === "modifier" && (
        <EditAttributionOrganisationModal
          closeModal={closeModal}
          attribution={attribution}
        />
      )}

      {action === "cloturer" && (
        <CloturerAttribution
          closeModal={closeModal}
          attribution={attribution}
        />
      )}

      {action === "supprimer" && (
        <SupprimerAttribution
          closeModal={closeModal}
          attribution={attribution}
        />
      )}
    </>
  );
};
