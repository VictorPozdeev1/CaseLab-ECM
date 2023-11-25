import $api from "./$api";
import { AxiosResponse } from "axios";

// Auth
export const CaselabEcmApi = {
  loginService: (email: string, password: string) =>
    $api({
      method: "post",
      url: "auth/login",
      body: {
        email,
        password,
      },
    }),
  // получить число пользователей
  getUsersCount: (token: string) =>
    $api({
      url: "statistic/users/count",
      token,
      method: "get",
    }),
  // получить всех пользователей
  getAllUsers: (token: string) =>
    $api({
      method: "get",
      token,
      url: "admin/users",
    }),

  //  получить все организации
  getAllOrganization: (token: string) =>
    $api({
      token,
      url: "v1/org",
      method: "get",
    }),
};

export default CaselabEcmApi;
