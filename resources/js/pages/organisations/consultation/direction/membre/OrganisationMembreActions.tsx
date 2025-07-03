import { FC, useMemo } from "react";
import { Stack } from "react-bootstrap";
import { AttributionResource } from "types/personne.type";
import { useModalAction } from "hooks";
import { DropOption } from "components/options/DropOptions";
import * as Icon from "react-bootstrap-icons";
import { CloturerAttribution } from "pages/attributions/common/CloturerAttribution";
import { SupprimerAttribution } from "pages/attributions/common/SupprimerAttribution";
import { useNavigate } from "react-router-dom";
import { LINKS } from "utils";
import { useDroits } from "hooks/useDroits";

type Props = {
  attribution: AttributionResource;
  nomminer: () => void;
};

export const OrganisationMembreActions: FC<Props> = ({ attribution, nomminer }) => {
  const modalAction = useModalAction();
  const navigation = useNavigate();
  const droits = useDroits();
  const actions = useMemo(() => {
    const actions = [
      {
        label: "Consulter",
        description: "Voir la fiche de la personne",
        code: "consulter",
        Icon: Icon.Eye,
        visible: true,
      },
      {
        label: "Changer",
        description: "Nomminer une autre personne",
        code: "nomminer",
        Icon: Icon.Pencil,
        visible: droits.organisation.direction(attribution.organisation),
      },
      {
        label: "Supprimer",
        description: "Supprimer la fonction",
        code: "supprimer",
        Icon: Icon.Trash3,
        visible: droits.organisation.direction(attribution.organisation),
      },
    ];
    return actions.filter((e) => e.visible);
  }, [attribution.organisation, droits.organisation]);

  return (
    <>
      <Stack direction="horizontal" className="ms-auto">
        <DropOption
          actions={actions}
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
        <CloturerAttribution closeModal={modalAction.close} attribution={attribution} />
      )}

      {modalAction.action === "supprimer" && (
        <SupprimerAttribution closeModal={modalAction.close} attribution={attribution} />
      )}
    </>
  );
};
