import { useQuery } from "@tanstack/react-query";
import { userApi } from "api/index";
import { Header } from "layout/Header";
import { useParams } from "react-router-dom";
import { UserResource } from "types/auth.type";
import { QUERY_KEY } from "utils/constants";
import { Utilisateur } from "./Utilisateur";

const ViewUtilisateur = () => {
  const { id: utilisateurId } = useParams();

  const { data: utilisateur, isLoading } = useQuery({
    queryKey: [QUERY_KEY.utilisateurs, utilisateurId],
    networkMode: "offlineFirst",
    queryFn: () => {
      return userApi.findById<UserResource>(utilisateurId!);
    },
  });

  if (isLoading || !utilisateur) {
    return <span>chargement ...</span>;
  }

  return (
    <>
      <Header title="Consulter" />

      <Utilisateur user={utilisateur} />
    </>
  );
};

export default ViewUtilisateur;
