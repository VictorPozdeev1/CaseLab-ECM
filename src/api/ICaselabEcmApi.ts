import type IOrganisation from '../Entities/IOrganization';
import type IUser from '../Entities/IUser';

export default interface ICaselabEcmApi {
  loginService: (email: string, password: string) => Promise<string>;
  getUsersCount: (token: string) => Promise<string>;
  getAllUsers: (token: string) => Promise<IUser[]>;
  getAllOrganizations: (token: string) => Promise<IOrganisation[]>;
}
