import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// API Base URL
const API_BASE_URL = "http://192.168.29.92:3004";
// const API_BASE_URL = "https://buynestbacknd-h2qa.onrender.com/";

interface DeleteApiCallerProps {
  uri: string;
  token?: string | number;
}

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorResponse<T> {
  success: false;
  message: string;
  data?: T;
}

// Union type that covers both cases
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse<T>;

const deleteApicaller = <T>({
  uri,
  token,
}: DeleteApiCallerProps): Promise<AxiosResponse<ApiResponse<T>>> => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: "delete",
      url: API_BASE_URL + uri,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };

    axios(config)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

interface ApiCallerProps {
  uri: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: object;
  token?: string | null | number;
  contentType?: string;
}

const apiCaller = <T>({
  uri,
  method = "GET",
  data = {},
  token,
  contentType,
}: ApiCallerProps): Promise<ApiResponse<T>> => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method,
      url: API_BASE_URL + uri,
      headers: {
        "Content-Type": contentType || "application/json",
        Accept: "/",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      data,
    };

    console.log(config, ":config");

    axios(config)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const HttpClient = {
  apiCaller,
  API_BASE_URL,
  deleteApicaller,
};
