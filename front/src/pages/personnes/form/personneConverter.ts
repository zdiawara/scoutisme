import { PersonneResource } from "types/personne.type";
import { DateFormater, DateParser } from "utils/DateUtils";
import { selectHelper } from "utils/functions";
import { PersonneUtils } from "utils/PersonneUtils";

const toBody = (data: Record<string, any>) => {
  const body: Record<string, any> = {
    photo: data.photo,
    nom: data.nom,
    prenom: data.prenom,
    lieu_naissance: data.lieu_naissance,
    date_naissance: DateFormater.toISO(data.date_naissance),
    email: data.email,
    telephone: data.telephone,
    personne_a_contacter: data.personne_a_contacter,
    ville_id: selectHelper.getValue(data.ville),
    genre_id: selectHelper.getValue(data.genre),
    adresse: data.adresse,
    type: data.type?.value,
  };

  if (data.type?.value === "adulte") {
    body.profession = data.profession;
    body.niveau_formation_id = selectHelper.getValue(data.niveau_formation);
  }

  if (data.attribution) {
    body.attribution = {
      organisation_id: selectHelper.getValue(data.attribution.organisation),
      fonction_id: selectHelper.getValue(data.attribution.fonction),
      date_debut: DateFormater.toISO(data.attribution.date_debut),
      date_fin: DateFormater.toISO(data.attribution.date_fin),
    };
  }

  return body;
};

const toIdentiteBody = (data: Record<string, any>) => {
  const body: Record<string, any> = {
    nom: data.nom,
    prenom: data.prenom,
    lieu_naissance: data.lieu_naissance,
    date_naissance: DateFormater.toISO(data.date_naissance),
    genre_id: selectHelper.getValue(data.genre),
    profession: data.profession,
  };

  return body;
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
    genre: data.genre ? { label: data.genre.nom, value: data.genre.id } : null,
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
