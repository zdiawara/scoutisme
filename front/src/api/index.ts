import { CrudService } from "./crudService";

class PersonneApi extends CrudService {}
export const personneApi = new PersonneApi("personnes");
