import { makeAutoObservable, runInAction } from 'mobx';
import { OpenAPI, Service } from '@api/generated';
import type {
  CurrentUserData,
  UserLoginResponseDto,
} from '@api/generated/models/UserLoginResponseDto';

type SessionData = UserLoginResponseDto;

const SESSION_DATA = 'sessionData';

const rolesMapping = {
  ADMIN: ['COMPANY_ADMIN', 'SYSTEM_ADMIN'],
  USER: ['USER'],
};

const REMEMBER_ME = true; // todo Брать из формы логина

class Session {
  constructor() {
    const savedSessionDataString = localStorage.getItem(SESSION_DATA);
    this._state =
      savedSessionDataString !== null
        ? JSON.parse(savedSessionDataString)
        : null;
    this._setApiToken();
    makeAutoObservable(this);
  }

  private _state: SessionData | null;

  get isAuth(): boolean {
    return this._state?.token !== undefined;
  }

  get userData(): CurrentUserData | undefined {
    return this._state?.user;
  }

  get roles(): string[] {
    if (this._state?.user?.role === undefined) return [];
    return (
      rolesMapping[this._state.user.role as keyof typeof rolesMapping] ?? []
    );
  }

  // Это, видимо, через autoRun делается в MobX?
  private _setApiToken(): void {
    OpenAPI.TOKEN = this._state?.token;
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await Service.login({ email, password });
      runInAction(() => {
        this._state = response;
        this._setApiToken();
      });
      if (REMEMBER_ME)
        localStorage.setItem(SESSION_DATA, JSON.stringify(response));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  logout(): void {
    try {
      localStorage.removeItem(SESSION_DATA);
      this._state = null;
      this._setApiToken();
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Session();
