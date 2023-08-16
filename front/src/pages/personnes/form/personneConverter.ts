import { PersonneResource } from "types/personne.type";
import { selectHelper } from "utils/functions";

const toBody = (data: Record<string, any>) => {
  return {
    photo: data.photo,
    nom: data.nom,
    prenom: data.prenom,
    lieu_naissance: data.lieu_naissance,
    date_naissance: data.date_naissance,
    email: data.email,
    ville_id: selectHelper.getValue(data.ville),
    //adresse: data.adresse,
    type: "scout",
  };
};
const toInput = (data: PersonneResource) => {
  return {
    id: data.id,
    nom: data.nom,
  };
};
export const personneConverter = {
  toBody,
  toInput,
};
