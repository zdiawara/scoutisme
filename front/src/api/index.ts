import { CrudService } from "./crudService";

class PersonneApi extends CrudService {}
export const personneApi = new PersonneApi("personnes");

class OrganisationApi extends CrudService {}
export const organisationApi = new OrganisationApi("organisations");
