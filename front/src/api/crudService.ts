import { ListPaginated, RequestParam } from "types/request.type";
import {
  requestBlob,
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "./request";
import { requestParams } from "utils/functions";

export class CrudService {
  protected base: string;

  constructor(base: string) {
    this.base = base;
  }

  public findAll<T>(params?: RequestParam) {
    return requestGet<ListPaginated<T>>(`${this.base}${requestParams(params)}`);
  }

  public async findById<T>(id: string) {
    const { data } = await requestGet<{ data: T }>(`${this.base}/${id}`);
    return data;
  }

  public async create<T>(body: any) {
    const { data } = await requestPost<{ data: T }>(this.base, body);
    return data;
  }

  public async update<T>(id: string, body: any) {
    const { data } = await requestPut<{ data: T }>(`${this.base}/${id}`, body);
    return data;
  }

  async delete(id: string) {
    await requestDelete(`${this.base}/${id}`);
  }

  async download(path: string, params?: RequestParam) {
    return requestBlob(`${this.base}/${path}${requestParams(params)}`).then(
      (response) => {
        const filename =
          response.headers?.get("Content-Disposition")?.split("filename=")[1] ||
          "document";

        return response.blob().then((blob: any) => {
          const fileURL = window.URL.createObjectURL(blob);
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = filename;
          alink.click();
        });
      }
    );
  }

  getBase = () => {
    return this.base;
  };
}
