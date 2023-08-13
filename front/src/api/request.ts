import { fetchApi, baseApi, RequestData } from "./fetchApi";

export enum ErrorType {
  network,
  request,
}
export interface ErrorModel {
  type: ErrorType;
  title: string;
  message?: string;
  errors?: Record<string, any>;
  status?: number;
}

export const buildError = (e: Record<string, any>): ErrorModel => {
  const data = e ? { ...e } : {};

  return {
    message: data.netWorkStatus
      ? "Vérifier votre connexion internet"
      : Object.keys(data.errors || {})
          .map((k) => data.errors[k])
          .join(" , "),
    errors: data.errors,
    title: data.name,
    type: data.netWorkStatus ? ErrorType.network : ErrorType.request,
    status: e.status,
  };
};

const dispatchError = (e: any) => {
  const error = buildError(e);
  //store.dispatch(setError(error));
  return Promise.reject(error);
};

export const requestJson = async <T>(
  url: string,
  options: RequestInit = {},
  auth: boolean = true
) => {
  const params: RequestData = {
    url: `${baseApi}/${url}`,
    options,
    type: "json",
  };

  if (auth) {
    params.token = localStorage.getItem("@burval.token") || undefined;
  }
  return fetchApi<T>(params).catch(dispatchError);
};

export const requestGet = async <T>(url: string, auth: boolean = true) => {
  return requestJson<T>(url, {}, auth);
};

export const requestPut = async <T>(
  url: string,
  body?: Object,
  auth = true
) => {
  return requestJson<T>(
    url,
    { method: "PUT", body: JSON.stringify(body || {}) },
    auth
  );
};

export const requestPost = async <T>(
  url: string,
  body?: Object,
  auth = true
) => {
  return requestJson<T>(
    url,
    { method: "POST", body: JSON.stringify(body || {}) },
    auth
  );
};

export const requestDelete = async (url: string, body?: Object) => {
  return requestJson(url, {
    method: "DELETE",
    body: JSON.stringify(body || {}),
  });
};

export const requestBlob = async (
  url: string,
  options: RequestInit = {},
  auth: boolean = true
) => {
  const params: RequestData = {
    url: `${baseApi}/${url}`,
    options: { method: "GET", ...options },
    type: "blob",
  };

  if (auth) {
    params.token = localStorage.getItem("@burval.token") || undefined;
  }
  return fetchApi<any>(params).catch(dispatchError);
};
