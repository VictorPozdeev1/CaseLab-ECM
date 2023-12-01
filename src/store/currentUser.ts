import { makeAutoObservable, runInAction } from 'mobx';

import CaselabEcmApi from '@api/CaselabEcmApi';
import type IUser from '@entities/IUser';

const { loginService, getAuthInfo } = CaselabEcmApi;

const TOKEN_ITEM_NAME = 'token';
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
  data?: IUser;
  isLoading: boolean = true;

  get roles(): string[] {
    return rolesMapping[this.data?.role as keyof typeof rolesMapping] ?? [];
  }

  getData: () => Promise<void> = async () => {
    try {
      this.isLoading = true;
      const res = await getAuthInfo(this.token as string);
      runInAction(() => {
        this.data = res;
        this.isLoading = false;
      });
    } catch {
      this.isLoading = false;
    }
  };

  refreshState(): void {
    this.token = localStorage.getItem(TOKEN_ITEM_NAME) ?? undefined;
    this.isAuth = this.token !== undefined;
    if (this.isAuth) {
      getAuthInfo(this.token as string)
        .then((dataRes: IUser) => {
          this.data = dataRes;
        })
        .catch(() => {});
    }
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

export default new CurrentUser();
