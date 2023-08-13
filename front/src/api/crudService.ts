import { ListPaginated, RequestParam } from "types/request.type";
import { requestGet, requestPost, requestPut } from "./request";
import { requestParams } from "utils/functions";

export class CrudService {
  private base: string;

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

  getBase = () => {
    return this.base;
  };
}
