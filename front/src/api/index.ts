import {
  AttributionResource,
  CotisationResource,
  OrganisationAttribution,
  PaiementResource,
  PersonneResource,
} from "types/personne.type";
import { CrudService } from "./crudService";
import { requestDelete, requestGet, requestPost, requestPut } from "./request";
import { RequestParam } from "types/request.type";
import { requestParams } from "utils/functions";
import { UserData } from "pages/auth/Login";
import { UserResource } from "types/auth.type";

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

  public async cotiser(personneId: string, body: any) {
    const response = await requestPost<{ data: CotisationResource }>(
      `${this.base}/${personneId}/cotiser`,
      body
    );
    return response;
  }

  public async convertir(personneId: string, body: any) {
    const response = await requestPost<{ data: UserResource }>(
      `${this.base}/${personneId}/convertir`,
      body
    );
    return response;
  }

  public async deleteAttribution(personneId: string) {
    const response = await requestDelete(
      `${this.base}/${personneId}/attributions`
    );
    return response;
  }

  public async cloturerAttribution(personneId: string, body: any) {
    const response = await requestPut<{ data: PersonneResource }>(
      `${this.base}/${personneId}/cloturer_attributions`,
      body
    );
    return response;
  }

  public async createAttribution(personneId: string, body: any) {
    const response = await requestPost<{ data: PersonneResource }>(
      `${this.base}/${personneId}/attributions`,
      body
    );
    return response;
  }

  public async findCotisation(personneId: string, annee: string) {
    const response = await requestGet<{ data: CotisationResource }>(
      `${this.base}/${personneId}/cotisations${requestParams({ annee })}`
    );
    return response;
  }
}

export const personneApi = new PersonneApi("personnes");

class OrganisationApi extends CrudService {
  public async findDirection(id: string, body?: Record<string, any>) {
    const { data } = await requestGet<{ data: OrganisationAttribution[] }>(
      `${this.base}/${id}/direction` + requestParams(body)
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

class CotisationApi extends CrudService {}
export const cotisationApi = new CotisationApi("cotisations");

class PaiementApi extends CrudService {
  public async valider(paiementId: string) {
    const response = await requestPut<{ data: PaiementResource }>(
      `${this.base}/${paiementId}/valider`
    );
    return response;
  }

  public async rejeter(paiementId: string, body: any) {
    const response = await requestPut<{ data: PaiementResource }>(
      `${this.base}/${paiementId}/rejeter`,
      body
    );
    return response;
  }
}
export const paiementApi = new PaiementApi("paiements");

class AuthApi extends CrudService {
  public async login(data: UserData) {
    const response = await requestPost<{ access_token: string }>(
      `${this.base}/login`,
      data
    );
    return response;
  }

  public async userInfo() {
    const response = await requestPost<{ data: UserResource }>(
      `${this.base}/me`,
      {}
    );
    return response;
  }
}

export const authApi = new AuthApi("auth");

class UserApi extends CrudService {}
export const userApi = new UserApi("users");

class RoleApi extends CrudService {
  public async updateFonctionnalites(roleId: string, body: any) {
    const response = await requestPut<{ data: PaiementResource }>(
      `${this.base}/${roleId}/fonctionnalites`,
      body
    );
    return response;
  }
}
export const roleApi = new RoleApi("roles");

class HabilitationApi extends CrudService {}
export const habilitationApi = new HabilitationApi("habilitations");

class ModuleApi extends CrudService {}
export const moduleApi = new ModuleApi("modules");

class MontantCotisationApi extends CrudService {}
export const montantCotisationApi = new MontantCotisationApi(
  "montants-cotisations"
);
