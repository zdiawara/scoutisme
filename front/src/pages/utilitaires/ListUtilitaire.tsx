import { PageHeader } from "pages/common";
import { FC } from "react";

const ListUtilitaire: FC = () => {
  return (
    <>
      <PageHeader.List
        title="Utilitaires"
        subtitle="Consulter et gérer les utilitaires"
        icon="uil-cog"
      />
    </>
  );
};

export default ListUtilitaire;
