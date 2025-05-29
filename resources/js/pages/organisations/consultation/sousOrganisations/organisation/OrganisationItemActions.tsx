import { FC } from "react";
import { Stack } from "react-bootstrap";
import { useModalAction } from "hooks";
import { DropOption } from "components/options/DropOptions";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { LINKS } from "utils";
import { OrganisationResource } from "types/organisation.type";

type Props = {
  organisation: OrganisationResource;
};

const ACTIONS = [
  {
    label: "Consulter",
    description: "Voir la fiche de l'organisation",
    code: "consulter",
    Icon: Icon.Eye,
  },
  {
    label: "Supprimer",
    description: "Supprimer l'organisation",
    code: "supprimer",
    Icon: Icon.Trash3,
  },
];

export const OrganisationItemActions: FC<Props> = ({ organisation }) => {
  const modalAction = useModalAction();
  const navigation = useNavigate();
  return (
    <Stack direction="horizontal" className="ms-auto">
      <DropOption
        actions={ACTIONS}
        onSelect={(code) => {
          if (code === "consulter") {
            navigation(LINKS.organisations.view(organisation.id));
          } else {
            modalAction.change(code)();
          }
        }}
      />
    </Stack>
  );
};
