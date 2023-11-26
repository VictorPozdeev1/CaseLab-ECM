import { makeAutoObservable } from "mobx";
import CaselabEcmApi from "@api/CaselabEcmApi";

const { loginService } = CaselabEcmApi;

class Store {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await loginService(email, password);
      localStorage.setItem("token", response as string);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      localStorage.removeItem("token");
      this.setAuth(false);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Store();
