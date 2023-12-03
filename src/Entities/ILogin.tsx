import type IUserLogin from './IUserLogin';

export default interface ILogin {
  token: string;
  user: IUserLogin;
}
