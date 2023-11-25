import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://127.0.0.1:8080";

const getRequestErrorFormatted = (error: any): { message: string } => {
  let message: string = "";
  if (!navigator.onLine) {
    message = "Error: no internet access";
  } else if (error.response) {
    const { status, data } = error.response;
    message = `Error ${status}: ${data}`;
    if (status === 401) {
      message = `Error: Handle unauthorized access`;
    } else if (status === 404) {
      message = `Error: Handle not found`;
    }
  } else if (error.request) {
    message = "No response received";
  } else {
    message = `Error: ${error.message}`;
  }
  return { message };
};

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

interface IApi {
  token?: string;
  method: Methods;
  url: string;
  body?: Object;
}

const $api = async ({
  token,
  method,
  url,
  body,
}: IApi): Promise<Object | string> => {
  try {
    let response: AxiosResponse<Object | string>;
    if (!body) {
      response = await axios[method](`${BASE_URL}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "*/*",
          credentials: "include",
        },
      });
    } else {
      response = await axios[method](`${BASE_URL}/${url}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "*/*",
          credentials: "include",
        },
      });
    }
    return response.data;
  } catch (err) {
    throw getRequestErrorFormatted(err);
  }
};

export default $api;
