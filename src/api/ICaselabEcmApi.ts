import type IOrganisation from '@entities/IOrganization';
import type IUser from '@entities/IUser';

export default interface ICaselabEcmApi {
  loginService: (email: string, password: string) => Promise<string>;
  getUsersCount: (token: string) => Promise<string>;
  getAllUsers: (token: string) => Promise<IUser[]>;
  getAllOrganizations: (token: string) => Promise<IOrganisation[]>;
  getAuthInfo: (token: string) => Promise<IUser>;
}
