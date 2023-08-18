import { CrudService } from "./crudService";

class PersonneApi extends CrudService {}
export const personneApi = new PersonneApi("personnes");

class OrganisationApi extends CrudService {}
export const organisationApi = new OrganisationApi("organisations");

class TypeOrganisationApi extends CrudService {}
export const typeOrganisationApi = new TypeOrganisationApi(
  "types_organisations"
);

class NatureApi extends CrudService {}
export const natureApi = new NatureApi("natures");

class VilleApi extends CrudService {}
export const villeApi = new VilleApi("villes");

class RefFormationApi extends CrudService {}
export const refFormationApi = new RefFormationApi("ref_formations");
