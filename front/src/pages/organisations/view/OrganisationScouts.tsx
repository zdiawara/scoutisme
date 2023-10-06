import { View } from "components";
import { ICONS } from "pages/common";
import { FC } from "react";
import { Card } from "react-bootstrap";
import { OrganisationResource } from "types/organisation.type";
import { attributionApi } from "api";
import { QUERY_KEY } from "utils/constants";
import { AttributionResource } from "types/personne.type";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { OrganisationScoutActions } from "../common";
import { AttributionActions } from "pages/attributions/common";
import { dateFormater } from "utils/functions";

type OrganisationScoutsProps = {
  organisation: OrganisationResource;
};

export const OrganisationScouts: FC<OrganisationScoutsProps> = ({
  organisation,
}) => {
  const {
    data: attributions,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.attributions, organisation.id],
    networkMode: "offlineFirst",
    queryFn: () =>
      attributionApi.findAll<AttributionResource>({
        organisationId: organisation.id,
        fonctionCode: "scout",
        type: "scout",
      }),
  });

  const renderContent = () => {
    if (isLoading) {
      return <span>chargement ...</span>;
    }
    if (error) {
      return <span>error</span>;
    }
    if (!attributions?.data?.length) {
      return <View.Empty label="Pas de membres" />;
    }
    return (
      <table className="table mt-3 mb-0">
        <thead className="text-black">
          <tr>
            <th>Nom</th>
            <th>Fonction</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th style={{ width: "100px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {attributions?.data.map((attribution) => (
            <tr key={attribution.id}>
              <td>
                <Link
                  to={LINKS.personnes.view(attribution.personne.id)}
                  className="text-black table-user d-flex"
                >
                  <div className="avatar-sm me-2">
                    {attribution.personne.photo ? (
                      <img
                        src={attribution.personne.photo}
                        alt=""
                        className="rounded-circle"
                        style={{
                          width: "100%",
                          height: "100%",
                          textAlign: "center",
                          objectFit: "cover",
                          color: "transparent",
                          textIndent: "10000px",
                        }}
                      />
                    ) : (
                      <span className="avatar-title bg-secondary-lighten text-secondary fs-4 rounded-circle">
                        {attribution.personne.prenom[0]}
                        {attribution.personne.nom[0]}
                      </span>
                    )}
                  </div>
                  <span className="fw-semibold text-primary">
                    {attribution.personne.prenom}&nbsp;
                    {attribution.personne.nom}
                  </span>
                </Link>
              </td>
              <td className="text-black">{attribution.fonction.nom}</td>
              <td>{dateFormater.formatStr(attribution.date_debut)}</td>
              <td>{dateFormater.formatStr(attribution.date_fin)}</td>
              <td>
                <AttributionActions attribution={attribution} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Card>
      <Card.Body>
        <View.Header
          icon={ICONS.personne}
          label="Scouts"
          description="Liste des scouts de l'unité  "
          className="mb-2"
          right={<OrganisationScoutActions organisation={organisation} />}
        />
        {renderContent()}
      </Card.Body>
    </Card>
  );
};
