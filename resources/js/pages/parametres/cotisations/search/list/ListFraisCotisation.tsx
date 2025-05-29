import { MontantFormatText } from "components/MontantFormatText";
import { FC } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { MontantCotisationResource } from "types/cotisation.type";

type Props = {
  fraisCotisations?: MontantCotisationResource[];
  edit: (montantCotisation: MontantCotisationResource) => void;
};

const TYPES: Record<string, string> = {
  direction_conseil_national: "Direction du conseil national",
  direction_equipe_nationale: "Direction de l'équipe nationale",
  direction_groupe: "Direction d'un groupe",
  direction_region: "Direction d'une région",
  direction_unite: "Direction d'une unité",
  scout: "Scout",
};

const PROFILS: Record<string, string> = {
  tous: "Tout le monde",
  type_organisation: "Par type d'organisation",
};

export const ListFraisCotisation: FC<Props> = ({ fraisCotisations, edit }) => {
  if (!fraisCotisations?.length) {
    return <ListGroup.Item className="text-center text-muted">Aucun frais trouvé</ListGroup.Item>;
  }

  return (
    <>
      {fraisCotisations.map((fraisCotisation) => (
        <ListGroup.Item key={fraisCotisation.id} className="d-flex justify-content-between align-items-start">
          <div className="test">
            <div className="fw-semibold fs-5 text-black">{TYPES[fraisCotisation.type]}</div>
            <span className="d-blockfw-light">{PROFILS[fraisCotisation.profil]}</span>
            <div className="mt-1">
              {fraisCotisation.montants.map((montant, i) => (
                <Badge key={i} bg="secondary" className="me-1">
                  <MontantFormatText key={montant.id} value={montant.value} withDevise />
                </Badge>
              ))}
            </div>
          </div>

          <Button variant="default" onClick={() => edit(fraisCotisation)}>
            <Icon.Pencil />
          </Button>
        </ListGroup.Item>
      ))}
    </>
  );
};
