import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { paiementApi, personneApi } from "api";
import { AsyncSelectSimple, View } from "components";
import { Columns, ICONS, ListResult } from "pages/common";
import { FC, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import {
  CotisationResource,
  PaiementResource,
  PersonneResource,
} from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { ListPaiementActions } from "../common/ListPaiementActions";
import { PaiementActions } from "../common/PaiementActions";
import { SelectItem } from "types/form.type";

type PersonneCotisationsProps = {
  personne: PersonneResource;
};

type EtatCotisationProps = {
  paiements?: PaiementResource[];
  cotisation?: CotisationResource;
};

const EtatCotisation: FC<EtatCotisationProps> = ({ paiements, cotisation }) => {
  if (!paiements || !cotisation) {
    return null;
  }

  const montantPaye = paiements
    .filter(({ etat }) => etat !== "rejet")
    .reduce((prev, curr) => {
      return curr.montant + prev;
    }, 0);

  return (
    <div className="my-2">
      {montantPaye >= (cotisation.montant_total || -1) ? (
        <>
          Etat cotisation &nbsp;
          <Badge bg="success">A jour</Badge>
        </>
      ) : (
        <>
          Montant restant à payer :&nbsp;
          <Badge bg="primary">
            {cotisation.montant_total - montantPaye} FCA
          </Badge>
        </>
      )}
    </div>
  );
};

const fetchYears = () => {
  const year = getYear(new Date());
  return Promise.resolve(
    new Array(5)
      .fill(1)
      .map((_, i) => year - i)
      .map((item) => ({
        value: `${item}`,
        label: `${item}`,
      }))
  );
};

export const PersonneCotisations: FC<PersonneCotisationsProps> = ({
  personne,
}) => {
  const [annee, setAnnee] = useState<SelectItem>(() => {
    const year = getYear(new Date()).toString();
    return {
      label: year,
      value: year,
    };
  });

  const paiementsQuery = useQuery({
    queryKey: [QUERY_KEY.paiements, personne.id, annee.value],
    networkMode: "offlineFirst",
    queryFn: () => {
      return paiementApi
        .findAll<PaiementResource>({
          personneId: personne.id,
          annee: annee.value,
        })
        .then(({ data }) => data);
    },
  });

  const cotisationQuery = useQuery({
    queryKey: [QUERY_KEY.personnes, "paiements", annee.value],
    networkMode: "offlineFirst",
    queryFn: () => {
      return personneApi.findCotisation(personne.id, annee.value);
    },
    select: ({ data }) => data,
  });

  const columns: Columns<PaiementResource>[] = [
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
    if (paiementsQuery.isLoading) {
      return <span>chargement ...</span>;
    }

    if (!paiementsQuery.data?.length) {
      return <View.Empty label="Pas de paiements trouvés" />;
    }

    return (
      <>
        <ListResult.Table<any>
          columns={columns}
          headerClassName="shadow-sm"
          data={paiementsQuery.data || []}
        />
      </>
    );
  };

  return (
    <>
      <Card body>
        <View.Header
          icon={ICONS.paiement}
          label="Cotisation"
          description="Montant de la cotisation de l'année 2023"
          className="mb-2"
          right={
            <AsyncSelectSimple
              name="year"
              value={annee}
              onChange={setAnnee}
              fetchOptions={fetchYears}
            />
          }
        />
        {cotisationQuery.isLoading ? (
          <>Chargement ...</>
        ) : (
          <>
            {cotisationQuery.data && (
              <>
                Le montant de la cotisation à payer est : &nbsp;
                <Badge bg="primary">
                  {cotisationQuery.data?.montant_total} frs
                </Badge>
              </>
            )}
            <EtatCotisation
              cotisation={cotisationQuery.data}
              paiements={paiementsQuery.data}
            />
          </>
        )}
      </Card>

      <Card body>
        <View.Header
          icon={ICONS.paiement}
          label="Paiements"
          description="Liste des paiements effectués"
          className="mb-2"
          right={
            <ListPaiementActions personne={personne} annee={annee.value} />
          }
        />
        {renderContent()}
      </Card>
    </>
  );
};
