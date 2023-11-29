/* eslint-disable */
import axios, {
  isAxiosError,
  type AxiosResponse,
  // type AxiosError,
} from 'axios';

const BASE_URL = 'http://127.0.0.1:8080';

const getRequestErrorFormatted = (error: unknown): { message: string } => {
  let message: string = '';
  if (!navigator.onLine) {
    message = 'Error: no internet access';
    return { message };
  }
  if (isAxiosError(error)) {
    if (error.response !== undefined) {
      message = `Error ${error.response?.status}: ${error.response?.data}`;
      if (error.response?.status === 401) {
        message = `Error: Handle unauthorized access`;
      } else if (error.response?.status === 404) {
        message = `Error: Handle not found`;
      }
      return { message };
    }

    if (error.request !== null) {
      message = 'No response received';
    } else {
      message = `Error: ${error.message}`;
    }
  } else {
    message = 'Not axios error';
    // return { message };
  }
  return { message };
};

type Methods = 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get';

interface IApi {
  token?: string;
  method: Methods;
  url: string;
  body?: unknown;
}

const $api = (token?: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token !== undefined ? `Bearer ${token}` : undefined,
      'Content-Type': 'application/json',
      accept: '*/*',
      credentials: 'include',
    },
  });

export default $api;
