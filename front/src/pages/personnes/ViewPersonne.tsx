import { FC } from "react";
import { PageHeader } from "pages/common";
import { useParams } from "react-router-dom";
import { PersonneResource } from "types/personne.type";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { useDroits } from "hooks/useDroits";
import { Personne } from "./view/Personne";

const ViewPersonne: FC = () => {
  const personneId = useParams().id!;
  const protection = useDroits();

  const actions = (personne: PersonneResource, page?: string) => {
    if (!protection.personne.modifier(personne) || page !== "fiche") {
      return null;
    }
    return (
      <Link
        className="rounded-corner btn btn-danger"
        to={LINKS.personnes.edit(personne.id)}
      >
        <i className="uil-edit-alt"></i>
        <span className="d-none d-sm-inline">Modifier</span>
      </Link>
    );
  };

  return (
    <Personne
      personneId={personneId}
      header={(personne, page) => (
        <PageHeader.View right={actions(personne, page)} className="my-4" />
      )}
    />
  );
};

export default ViewPersonne;
