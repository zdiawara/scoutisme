/**
 * Formatte message d'erreur
 * @param {*} errors
 */

function formatErrors(errors: { [key: string]: any }) {
  let resultats = {} as { [key: string]: string };
  Object.keys(errors).forEach((key) => {
    resultats[key] = errors[key][0] ? errors[key][0] : errors[key];
  });

  return resultats;
}

/**
 * Construit et formatte l'erreur
 * @param {*} data
 */

interface HttpError extends Error {
  errors: { [key: string]: string };
  status: number;
}

function buildErrors(status: number, data?: any) {
  const e = { errors: data, status } as HttpError;
  let results = null;
  e.name = "Erreur de traitement";
  if (status === 422) {
    results = data
      ? formatErrors(data.errors)
      : { validation: "error de validation des données" };
  } else if ([409, 401, 404, 400].includes(status)) {
    results = { message: data.message || "Conflict" };
  } else {
    results = {
      message: "Impossible de communiquer avec la plateforme !",
    };
  }
  e.errors = results;
  return e;
}

export interface RequestData {
  url: string;
  options: RequestInit;
  token?: string;
  type: "json" | "blob";
}

const buildOptions = (options: RequestInit, type: string, token?: string) => {
  const newOptions = { ...options };

  newOptions.headers = {
    Accept: "application/json",
    //credentials: "include",
    //"Access-Control-Allow-Origin": "http://localhost:3000/",
  };

  if (!options.method) {
    newOptions.method = "GET";
  }

  if (token) {
    newOptions.headers.Authorization = `Bearer ${token}`;
  }

  if (type === "json") {
    newOptions.headers["Content-Type"] = "application/json";
  }

  return newOptions;
};

export const fetchApi = async <T>(requestData: RequestData): Promise<T> => {
  try {
    const response: Response = await fetch(
      requestData.url,
      buildOptions(requestData.options, requestData.type, requestData.token)
    );
    let data;

    switch (requestData.type) {
      case "json":
        data = isJson(response) ? await response.json() : {};
        break;
      default:
        data = response;
        break;
    }

    if (response.ok) {
      if (requestData.type === "json") return data as T;
      return response as any;
    }
    return Promise.reject(buildErrors(response.status, data));
  } catch (error) {
    return Promise.reject(buildErrors(500));
  }
};

const isJson = (response: Response) => {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.indexOf("application/json") !== -1;
};

export const baseApi = `${process.env.REACT_APP_API}/api`;
