import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { paiementApi } from "api";
import { Columns, ICONS, StaticTable } from "pages/common";
import { FC, useState } from "react";
import { PaiementResource, PersonneResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { ListPaiementActions } from "../common/ListPaiementActions";
import { PaiementActions } from "../common/PaiementActions";
import { SelectItem } from "types/form.type";
import { Cotisation } from "./Cotisation";
import { MontantFormatText } from "components";
import { EtatPaiement } from "pages/paiements/common";

type PersonneCotisationsProps = {
  personne: PersonneResource;
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

  const columns: Columns<PaiementResource>[] = [
    {
      name: "numero",
      label: "Numéro",
      Cell: ({ numero }) => (
        <span className="text-primary fw-bold">{numero}</span>
      ),
    },
    {
      name: "montant",
      label: "Montant",
      Cell: ({ montant }) => <MontantFormatText value={montant} />,
    },
    {
      name: "created_at",
      label: "Date soumission",
    },
    {
      name: "etat",
      label: "Etat",
      Cell: ({ etat }) => <EtatPaiement etat={etat} />,
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

  return (
    <>
      <Cotisation
        annee={annee}
        setAnnee={setAnnee}
        personneId={personne.id}
        paiements={paiementsQuery.data}
      />
      <StaticTable
        header={{
          icon: ICONS.paiement,
          label: "Paiements",
          description: "Liste des paiements effectués",
        }}
        data={paiementsQuery.data}
        columns={columns}
        isLoading={paiementsQuery.isLoading}
        error={paiementsQuery.error}
        actions={
          <ListPaiementActions personne={personne} annee={annee.value} />
        }
      />
    </>
  );
};
