import $api from './$api';
import type ICaselabEcmApi from './contracts/ICaselabEcmApi';
import type IUser from './contracts/IUser';
import type IOrganisation from './contracts/IOrganisation';

// Auth
export const CaselabEcmApi: ICaselabEcmApi = {
  loginService: async (email: string, password: string): Promise<string> => {
    return await $api()
      .post<string>('auth/login', { email, password })
      .then((response) => response.data);
  },

  // получить число пользователей
  getUsersCount: async (token: string): Promise<string> => {
    return await $api(token)
      .get<{ countUser: string }>('statistic/users/count')
      .then((response) => response.data.countUser);
  },

  // получить всех пользователей
  getAllUsers: async (token: string): Promise<IUser[]> =>
    await $api(token)
      .get<IUser[]>('admin/users')
      .then((response) => response.data),

  //  получить все организации
  getAllOrganization: async (token: string): Promise<IOrganisation[]> =>
    await $api(token)
      .get<IOrganisation[]>('v1/org')
      .then((response) => response.data),
};

export default CaselabEcmApi;
