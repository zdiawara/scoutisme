import { FC } from "react";
import { Stack } from "react-bootstrap";
import { AttributionResource } from "types/personne.type";
import { useModalAction } from "hooks";
import { DropOption } from "components/options/DropOptions";
import * as Icon from "react-bootstrap-icons";
import { CloturerAttribution } from "pages/attributions/common/CloturerAttribution";
import { SupprimerAttribution } from "pages/attributions/common/SupprimerAttribution";
import { useNavigate } from "react-router-dom";
import { LINKS } from "utils";

type Props = {
  attribution: AttributionResource;
  nomminer: () => void;
};

const ACTIONS = [
  {
    label: "Consulter",
    description: "Voir la fiche de la personne",
    code: "consulter",
    Icon: Icon.Eye,
  },
  {
    label: "Changer",
    description: "Nomminer une autre personne",
    code: "nomminer",
    Icon: Icon.Pencil,
  },
  {
    label: "Supprimer",
    description: "Supprimer la fonction",
    code: "supprimer",
    Icon: Icon.Trash3,
  },
];

export const OrganisationMembreActions: FC<Props> = ({
  attribution,
  nomminer,
}) => {
  const modalAction = useModalAction();
  const navigation = useNavigate();
  return (
    <>
      <Stack direction="horizontal" className="ms-auto">
        <DropOption
          actions={ACTIONS}
          onSelect={(code) => {
            if (code === "consulter") {
              navigation(LINKS.personnes.view(attribution.personne.id));
            } else if (code === "nomminer") {
              nomminer();
            } else {
              modalAction.change(code)();
            }
          }}
        />
      </Stack>

      {modalAction.action === "cloturer" && (
        <CloturerAttribution
          closeModal={modalAction.close}
          attribution={attribution}
        />
      )}

      {modalAction.action === "supprimer" && (
        <SupprimerAttribution
          closeModal={modalAction.close}
          attribution={attribution}
        />
      )}
    </>
  );
};
