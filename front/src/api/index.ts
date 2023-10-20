import {
  AttributionResource,
  OrganisationAttribution,
  PersonneResource,
} from "types/personne.type";
import { CrudService } from "./crudService";
import { requestGet, requestPost } from "./request";
import { RequestParam } from "types/request.type";
import { requestParams } from "utils/functions";

export * from "./stats";

class PersonneApi extends CrudService {
  public async findPersonnesSansFonction(params?: RequestParam) {
    const response = await requestGet<{ data: PersonneResource[] }>(
      "personnes_sans_fonction" + requestParams(params)
    );
    return response;
  }
  public async affecter(personneId: string, body: any) {
    const response = await requestPost<{ data: AttributionResource }>(
      `${this.base}/${personneId}/affecter`,
      body
    );
    return response;
  }
}

export const personneApi = new PersonneApi("personnes");

class OrganisationApi extends CrudService {
  public async findDirection(id: string) {
    const { data } = await requestGet<{ data: OrganisationAttribution[] }>(
      `${this.base}/${id}/direction`
    );
    return data;
  }
}
export const organisationApi = new OrganisationApi("organisations");

class TypeOrganisationApi extends CrudService {}
export const typeOrganisationApi = new TypeOrganisationApi(
  "type_organisations"
);

class NatureApi extends CrudService {}
export const natureApi = new NatureApi("natures");

class VilleApi extends CrudService {}
export const villeApi = new VilleApi("villes");

class RefFormationApi extends CrudService {}
export const refFormationApi = new RefFormationApi("ref_formations");

class FonctionApi extends CrudService {}
export const fonctionApi = new FonctionApi("fonctions");

class AttributionApi extends CrudService {}
export const attributionApi = new AttributionApi("attributions");

class GenreApi extends CrudService {}
export const genreApi = new GenreApi("genres");

class MessageApi extends CrudService {}
export const messageApi = new MessageApi("messages");

class InstanceApi extends CrudService {}
export const instanceApi = new InstanceApi("instances");
