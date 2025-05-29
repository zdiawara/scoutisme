import { AttributionResource } from "types/personne.type";
import { DateFormater, DateParser } from "utils/DateUtils";
import { selectHelper } from "utils/functions";

const toBody = (data: Record<string, any>) => {
  return {
    personne_id: selectHelper.getValue(data.personne),
    organisation_id: selectHelper.getValue(data.organisation),
    fonction_id: selectHelper.getValue(data.fonction),
    date_debut: DateFormater.toISO(data.date_debut),
    date_fin: DateFormater.toISO(data.date_fin),
  };
};
const toInput = (data: AttributionResource) => {
  const { personne, organisation, fonction, date_debut, date_fin } = data;
  return {
    id: data.id,
    personne: {
      label: `${personne.prenom} ${personne.nom}`,
      value: personne.id,
    },
    organisation: { label: organisation.nom, value: organisation.id },
    fonction: { label: fonction.nom, value: fonction.id },
    date_debut: DateParser.toDate(date_debut),
    date_fin: DateParser.toDate(date_fin),
  };
};
export const attributionConverter = {
  toBody,
  toInput,
};
