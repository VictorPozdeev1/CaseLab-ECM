import $api from './$api';
import type ICaselabEcmApi from './ICaselabEcmApi';
import type IUser from '@entities/IUser';
import type IOrganization from '@entities/IOrganization';
import { type AxiosResponse } from 'axios';
import type ILogin from '@entities/ILogin';

// Auth
export const CaselabEcmApi: ICaselabEcmApi = {
  loginService: async (email: string, password: string): Promise<ILogin> => {
    const response: AxiosResponse<ILogin> = await $api().post<ILogin>(
      'auth/login',
      { email, password },
    );
    return response.data;
  },

  // получить число пользователей
  getUsersCount: async (token: string): Promise<string> => {
    const response: AxiosResponse<{ countUser: string }> = await $api(
      token,
    ).get<{ countUser: string }>('statistic/users/count');
    return response.data.countUser;
  },

  // получить всех пользователей
  getAllUsers: async (token: string): Promise<IUser[]> => {
    const response: AxiosResponse<IUser[]> =
      await $api(token).get<IUser[]>('admin/users');
    return response.data;
  },

  //  получить все организации
  getAllOrganizations: async (token: string): Promise<IOrganization[]> => {
    const response: AxiosResponse<IOrganization[]> =
      await $api(token).get<IOrganization[]>('v1/org');
    return response.data;
  },

  // получить информацию о пользователе по токену авторизации
  getAuthInfo: async (token: string): Promise<IUser> => {
    const response: AxiosResponse<IUser> =
      await $api(token).get<IUser>('auth/info');
    return response.data;
  },
};

export default CaselabEcmApi;
