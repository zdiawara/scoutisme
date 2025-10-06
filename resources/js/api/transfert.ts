import { requestPost } from "./request";
import { CrudService } from "./crudService";
import { requestParams } from "utils/functions";

class TransfertApi extends CrudService {
  public async confirmer(transfertId: string, signature: string) {
    const response = await requestPost(`${this.base}/${transfertId}/confirmer${requestParams({ signature })}`);
    return response;
  }
}
export const transfertApi = new TransfertApi("transferts");
