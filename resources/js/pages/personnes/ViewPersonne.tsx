import { FC } from "react";
import { useParams } from "react-router-dom";
import { Personne } from "./view/Personne";

const ViewPersonne: FC = () => {
  const personneId = useParams().id!;
  // const protection = useDroits();

  return <Personne personneId={personneId} title="Consulter" />;
};

export default ViewPersonne;
