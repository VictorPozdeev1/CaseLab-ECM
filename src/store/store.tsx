import { makeAutoObservable, runInAction } from 'mobx';

import CaselabEcmApi from '@api/CaselabEcmApi';

const { loginService } = CaselabEcmApi;

const TOKEN_ITEM_NAME = 'token';

class CurrentUser {
  constructor() {
    this.refreshState();
    makeAutoObservable(this);
  }

  token?: string;
  isAuth: boolean = false;
  roles: string[] = [];

  refreshState(): void {
    this.token = localStorage.getItem(TOKEN_ITEM_NAME) ?? undefined;
    this.isAuth = this.token !== undefined;
    this.roles = this.isAuth ? ['COMPANY_ADMIN', 'USER'] : []; // Сделать по-нормальному из роли юзера: 'ADMIN' -> ['COMPANY_ADMIN', 'SYSTEM_ADMIN'] ; 'USER' -> ['USER']
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      // email = password; // for eslint
      const response = await loginService(email, password);
      // const response = 'fake_token';
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
