import { useQuery } from "@tanstack/react-query";
import { cotisationApi, paiementApi } from "api";
import { View } from "components";
import { Columns, ICONS, ListResult } from "pages/common";
import { FC } from "react";
import { Badge, Card } from "react-bootstrap";
import {
  CotisationResource,
  PaiementResource,
  PersonneResource,
} from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { ListPaiementActions } from "../common/ListPaiementActions";
import { PaiementActions } from "../common/PaiementActions";

type PersonneCotisationsProps = {
  personne: PersonneResource;
};
export const PersonneCotisations: FC<PersonneCotisationsProps> = ({
  personne,
}) => {
  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.paiements, personne.id],
    networkMode: "offlineFirst",
    queryFn: () => {
      return paiementApi.findAll<PaiementResource>({
        personneId: personne.id,
        annee: 2023,
      });
    },
  });

  const { data: cotisation } = useQuery({
    queryKey: [QUERY_KEY.cotisations, personne.id, 2023],
    networkMode: "offlineFirst",
    cacheTime: 0,
    queryFn: () => {
      return cotisationApi.findAll<CotisationResource>({
        personneId: personne.id,
        annee: 2023,
      });
    },
  });

  const columns: Columns<any>[] = [
    {
      name: "numero",
      label: "Numéro",
    },
    {
      name: "montant",
      label: "Montant",
    },
    {
      name: "created_at",
      label: "Date soumission",
    },
    {
      name: "etat",
      label: "Etat",
      Cell: ({ etat }) => {
        return (
          <Badge
            bg={
              etat === "valide"
                ? "success"
                : etat === "rejet"
                ? "danger"
                : "warning"
            }
          >
            {etat}
          </Badge>
        );
      },
    },
    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (paiement) => {
        return <PaiementActions personne={personne} paiement={paiement} />;
      },
    },
  ];

  const renderContent = () => {
    if (isLoading) {
      return <span>chargement ...</span>;
    }
    if (error) {
      return <span>error</span>;
    }
    if (!results?.data?.length) {
      return <View.Empty label="Pas de paiements trouvés" />;
    }

    const montantPaye = results.data
      .filter((e) => e.etat !== "rejet")
      .reduce((prev, curr) => {
        return curr.montant + prev;
      }, 0);

    return (
      <>
        {cotisation?.data[0] && (
          <div className="my-2">
            {montantPaye >= (cotisation?.data[0]?.montant_total || -1) ? (
              <>
                Etat cotisation &nbsp;
                <Badge bg="success">A jour</Badge>
              </>
            ) : (
              <>
                Montant restant à payer :&nbsp;
                <Badge bg="primary">
                  {cotisation?.data[0]?.montant_total - montantPaye} FCA
                </Badge>
              </>
            )}
          </div>
        )}
        <ListResult.Table<any>
          columns={columns}
          headerClassName="shadow-sm"
          data={results?.data || []}
        />
      </>
    );
  };

  return (
    <Card>
      <Card.Body>
        <View.Header
          icon={ICONS.paiement}
          label="Paiements"
          description="Liste des paiements effectués"
          className="mb-2"
          right={<ListPaiementActions personne={personne} />}
        />
        {renderContent()}
      </Card.Body>
    </Card>
  );
};
