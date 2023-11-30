import { makeAutoObservable, runInAction } from 'mobx';

import CaselabEcmApi from '@api/CaselabEcmApi';
import type IUser from '@entities/IUser';

const { loginService, getAuthInfo } = CaselabEcmApi;

const TOKEN_ITEM_NAME = 'token';

class CurrentUser {
  constructor() {
    this.refreshState();
    makeAutoObservable(this);
  }

  isAuth: boolean = false;
  roles: string[] = [];
  token: string = localStorage.getItem(TOKEN_ITEM_NAME) ?? '';
  data: IUser | null = null;

  refreshState(): void {
    this.isAuth = localStorage.getItem(TOKEN_ITEM_NAME) !== null;
    this.roles = this.isAuth ? ['COMPANY_ADMIN', 'USER'] : [];
    void getAuthInfo(this.token).then(
      (dataRes: IUser) => (this.data = dataRes),
    );
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await loginService(email, password);
      this.token = response;
      localStorage.setItem(TOKEN_ITEM_NAME, response);
      runInAction(() => {
        this.refreshState();
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  logout(): void {
    try {
      localStorage.removeItem(TOKEN_ITEM_NAME);
      this.refreshState();
    } catch (e) {
      console.log(e);
    }
  }
}
const currentUser = new CurrentUser();
export { currentUser };
