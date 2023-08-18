import { PersonneResource } from "types/personne.type";
import { dateFormater, dateParser, selectHelper } from "utils/functions";

const toBody = (data: Record<string, any>) => {
  const body: Record<string, any> = {
    photo: data.photo,
    nom: data.nom,
    prenom: data.prenom,
    lieu_naissance: data.lieu_naissance,
    date_naissance: dateFormater.toBackPattern(data.date_naissance),
    email: data.email,
    telephone: data.telephone,
    personne_a_contacter: data.personne_a_contacter,
    ville_id: selectHelper.getValue(data.ville),
    adresse: data.adresse,
    type: data.type?.value,
  };

  if (data.type?.value === "adulte") {
    body.profession = data.profession;
    body.niveau_formation_id = selectHelper.getValue(data.niveau_formation);
  }

  return {
    photo: data.photo,
    nom: data.nom,
    prenom: data.prenom,
    lieu_naissance: data.lieu_naissance,
    date_naissance: dateFormater.toBackPattern(data.date_naissance),
    email: data.email,
    telephone: data.telephone,
    profession: data.profession,
    niveau_formation_id: selectHelper.getValue(data.niveau_formation),
    personne_a_contacter: data.personne_a_contacter,
    ville_id: selectHelper.getValue(data.ville),
    adresse: data.adresse,
    type: data.type?.value,
  };
};
const toInput = (data: PersonneResource) => {
  return {
    id: data.id,
    photo: data.photo,
    nom: data.nom,
    prenom: data.prenom,
    lieu_naissance: data.lieu_naissance,
    date_naissance: dateParser.toDate(data.date_naissance),
    email: data.email,
    telephone: data.telephone,
    profession: data.profession,
    niveau_formation: data.niveau_formation
      ? { label: data.niveau_formation.nom, value: data.niveau_formation.id }
      : null,
    personne_a_contacter: data.personne_a_contacter,
    ville: data.ville ? { label: data.ville.nom, value: data.ville.id } : null,
    adresse: data.adresse,
    type: {
      value: data.type,
      label: data.type === "scout" ? "Scout" : "Adulte",
    },
  };
};
export const personneConverter = {
  toBody,
  toInput,
};
