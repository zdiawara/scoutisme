import { FC, useState } from "react";
import {
  AttributionResource,
  FonctionResource,
  OrganisationAttribution,
  PersonneResource,
} from "types/personne.type";

import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { OrganisationMembreActions } from "./OrganisationMembreActions";
import { OrganisationResource } from "types/organisation.type";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { NominerModal } from "pages/attributions/common/nomminer/NominerModal";

type Props = {
  attribution: OrganisationAttribution;
  organisation: OrganisationResource;
};

export const OrganisationMembre: FC<Props> = ({
  attribution,
  organisation,
}) => {
  const [nomminer, setNominer] = useState<boolean>(false);

  const _attribution = {
    ...attribution,
    fonction: attribution.fonction as FonctionResource,
    organisation,
    personne: attribution.personne as PersonneResource,
  } as AttributionResource;

  return (
    <>
      <div className="me-auto">
        <div className="fw-semibold mb-1">{attribution.fonction.nom}</div>
        {attribution.personne ? (
          <>
            <Link
              to={LINKS.personnes.view(attribution.personne.id)}
              className="text-decoration-underlines text-black fw-light d-flex align-items-center"
            >
              <Icon.Person size="1.1rem" className="me-1" />
              {attribution.personne?.prenom} {attribution.personne?.nom}
            </Link>
            <span className="fw-light fs-6 text-muted">
              {attribution.personne?.code}
            </span>
          </>
        ) : (
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              setNominer(true);
            }}
          >
            <Icon.Pencil className="me-1" />
            Nomminer
          </Button>
        )}
      </div>
      {attribution.personne && (
        <OrganisationMembreActions
          attribution={_attribution}
          nomminer={() => {
            setNominer(true);
          }}
        />
      )}
      {nomminer && (
        <NominerModal
          fonction={_attribution.fonction}
          organisation={_attribution.organisation}
          closeModal={() => {
            setNominer(false);
          }}
        />
      )}
    </>
  );
};
