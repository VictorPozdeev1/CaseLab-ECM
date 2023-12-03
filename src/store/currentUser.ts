import { makeAutoObservable, runInAction } from 'mobx';

import CaselabEcmApi from '@api/CaselabEcmApi';
import type IUserLogin from '@entities/IUserLogin';

const { loginService } = CaselabEcmApi;

const TOKEN_ITEM_NAME = 'token';
const USER_DATA = 'userData';
const rolesMapping = {
  ADMIN: ['COMPANY_ADMIN', 'SYSTEM_ADMIN'],
  USER: ['USER'],
};

class CurrentUser {
  constructor() {
    this.refreshState();
    makeAutoObservable(this);
  }

  token?: string;
  isAuth: boolean = false; // todo Сделать computed value
  data?: IUserLogin;
  get roles(): string[] {
    return rolesMapping[this.data?.role as keyof typeof rolesMapping] ?? [];
  }

  refreshState(): void {
    this.token = localStorage.getItem(TOKEN_ITEM_NAME) ?? undefined;
    this.isAuth = this.token !== undefined;
    this.data =
      localStorage.getItem(USER_DATA) != null
        ? JSON.parse(localStorage.getItem(USER_DATA) as string)
        : undefined;
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await loginService(email, password);
      localStorage.setItem(TOKEN_ITEM_NAME, response.token);
      localStorage.setItem(USER_DATA, JSON.stringify(response.user));
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
      localStorage.removeItem(USER_DATA);
      this.refreshState();
    } catch (e) {
      console.log(e);
    }
  }
}

export default new CurrentUser();
