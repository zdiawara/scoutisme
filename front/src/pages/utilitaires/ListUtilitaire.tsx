import { ICONS, PageHeader } from "pages/common";
import { FC } from "react";

const ListUtilitaire: FC = () => {
  return (
    <>
      <PageHeader.List
        title="Utilitaires"
        subtitle="Consulter et gérer les utilitaires"
        icon={ICONS.setting}
      />
    </>
  );
};

export default ListUtilitaire;
