import $api from './$api';
// import { AxiosResponse } from 'axios';

// Auth
export const CaselabEcmApi = {
  loginService: async (email: string, password: string) =>
    await $api({
      method: 'post',
      url: 'auth/login',
      body: {
        email,
        password,
      },
    }),
  // получить число пользователей
  getUsersCount: async (token: string) =>
    await $api({
      url: 'statistic/users/count',
      token,
      method: 'get',
    }),
  // получить всех пользователей
  getAllUsers: async (token: string) =>
    await $api({
      method: 'get',
      token,
      url: 'admin/users',
    }),

  //  получить все организации
  getAllOrganization: async (token: string) =>
    await $api({
      token,
      url: 'v1/org',
      method: 'get',
    }),
};

export default CaselabEcmApi;
