import { makeAutoObservable } from 'mobx';
import CaselabEcmApi from '@api/CaselabEcmApi';

const { loginService } = CaselabEcmApi;

class Store {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean): void {
    this.isAuth = bool;
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response = await loginService(email, password);
      localStorage.setItem('token', response as string);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('token');
      this.setAuth(false);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Store();
