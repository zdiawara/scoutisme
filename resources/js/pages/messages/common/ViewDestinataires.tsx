import { Columns, ICONS, StaticTable } from "pages/common";
import { DestinataireResource } from "types/message.type";

type ViewDestinatairesProps = {
  destinataires?: DestinataireResource[];
};

const searchByCriteres = (term: string, roles: DestinataireResource[]) => {
  return roles.filter(({ email, nom, prenom }) =>
    [email, nom, prenom].join(" ").match(new RegExp(term, "gi"))
  );
};

const columns: Columns<DestinataireResource>[] = [
  {
    name: "nom",
    label: "Nom",
  },

  {
    name: "prenom",
    label: "Prénom",
  },

  {
    name: "email",
    label: "Email",
  },
];

export const ViewDestinataires = ({
  destinataires,
}: ViewDestinatairesProps) => {
  return (
    <>
      <StaticTable
        header={{
          icon: ICONS.personne,
          label: "Destinataires",
          description: `${destinataires?.length} personne(s)`,
        }}
        data={destinataires || []}
        search={{
          onSearch: searchByCriteres,
          placeholder: "",
        }}
        columns={columns}
        isLoading={false}
      />
    </>
  );
};
