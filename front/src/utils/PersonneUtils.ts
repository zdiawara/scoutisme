import { PersonneResource, TypePersonne } from "types/personne.type";

const isScout = ({ type }: PersonneResource) => {
  return type === TypePersonne.scout;
};

const isAdulte = ({ type }: PersonneResource) => {
  return type === TypePersonne.adulte;
};

export const PersonneUtils = {
  isScout,
  isAdulte,
};
