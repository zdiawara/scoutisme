import { FC, ReactNode } from "react";
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
      <div className="ms-auto d-flex align-items-center">
        <Link
          className="rounded-corner btn btn-danger"
          to={LINKS.personnes.edit(personne.id)}
        >
          <i className="uil-edit-alt"></i> Modifier
        </Link>
      </div>
    );
  };

  const renderHeader = (
    personne: PersonneResource,
    page?: string
  ): ReactNode => {
    return (
      <PageHeader.View
        title={`${personne.nom} ${personne.prenom}`}
        subtitle={`Code : ${personne.code}`}
        right={actions(personne, page)}
        className="my-4"
      />
    );
  };

  return <Personne personneId={personneId} header={renderHeader} />;
};

export default ViewPersonne;
