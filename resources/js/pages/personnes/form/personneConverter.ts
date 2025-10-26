import { PersonneInput, PersonneResource } from "types/personne.type";
import { DateFormater, DateParser } from "utils/DateUtils";
import { selectHelper } from "utils/functions";
import { PersonneUtils } from "utils/PersonneUtils";

type Element = string | undefined | null | object;

const toBody = (data: PersonneInput) => {
  const body: Record<string, Element> = {
    nom: data.identite.nom,
    prenom: data.identite.prenom,
    genre_id: data.identite.genre,
    lieu_naissance: data.identite.lieu_naissance,
    date_naissance: DateFormater.toISO(data.identite?.date_naissance),
    profession: data.identite.profession,

    personne_a_contacter: data.personneAContacter.personne_a_contacter,

    email: data.coordonnee.email,
    telephone: data.coordonnee.telephone,
    ville_id: selectHelper.getValue(data.coordonnee.ville),
    adresse: data.coordonnee.adresse,
  };

  return body;
};

const toIdentiteBody = (data: Record<string, any>) => {
  return {
    nom: data.nom,
    prenom: data.prenom,
    lieu_naissance: data.lieu_naissance,
    date_naissance: DateFormater.toISO(data.date_naissance),
    genre_id: data.genre,
    profession: data.profession,
  };
};

const toCoordonneeBody = (data: Record<string, any>) => {
  return {
    email: data.email,
    telephone: data.telephone,
    ville_id: selectHelper.getValue(data.ville),
    adresse: data.adresse,
  };
};

const toPersonneAContacterBody = (data: Record<string, any>) => {
  return {
    personne_a_contacter: data.personne_a_contacter,
  };
};

const toInput = (data: PersonneResource) => {
  return {
    id: data.id,
    photo: data.photo,
    nom: data.nom,
    prenom: data.prenom,
    lieu_naissance: data.lieu_naissance,
    date_naissance: DateParser.toDate(data.date_naissance),
    email: data.email,
    telephone: data.telephone,
    profession: data.profession,
    // formation: data.formation
    //   ? {
    //       label: data.formation.niveau_formation.nom,
    //       value: data.formation.niveau_formation.id,
    //     }
    //   : null,
    personne_a_contacter: data.personne_a_contacter,
    ville: data.ville ? { label: data.ville.nom, value: data.ville.id } : null,
    adresse: data.adresse,
    genre: data.genre?.id,
    type: {
      value: data.type,
      label: PersonneUtils.isScout(data) ? "Scout" : "Adulte",
    },
  };
};

export const personneConverter = {
  toBody,
  toIdentiteBody,
  toCoordonneeBody,
  toPersonneAContacterBody,
  toInput,
};
