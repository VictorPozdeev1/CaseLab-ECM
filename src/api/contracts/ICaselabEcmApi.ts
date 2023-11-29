import type IOrganisation from './IOrganisation';
import type IUser from './IUser';

export default interface ICaselabEcmApi {
  loginService: (email: string, password: string) => Promise<string>;
  getUsersCount: (token: string) => Promise<string>;
  getAllUsers: (token: string) => Promise<IUser[]>;
  getAllOrganization: (token: string) => Promise<IOrganisation[]>;
}
