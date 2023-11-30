import $api from './$api';
import type ICaselabEcmApi from './ICaselabEcmApi';
import type IUser from '../Entities/IUser';
import type IOrganization from '../Entities/IOrganization';
import { type AxiosResponse } from 'axios';

// Auth
export const CaselabEcmApi: ICaselabEcmApi = {
  loginService: async (email: string, password: string): Promise<string> => {
    const response: AxiosResponse<string> = await $api().post<string>(
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
};

export default CaselabEcmApi;
