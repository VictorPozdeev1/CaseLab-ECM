import { makeAutoObservable, runInAction } from 'mobx';
import { OpenAPI, Service } from '@api';
import type { AuthTokenDto } from '@api';
import { User } from '@entities/user';

type SessionData = AuthTokenDto;

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

  get currentUserData(): User {
    const userData = this._state?.user;
    if (userData === undefined) throw new Error('userData === undefined');
    return new User(userData);
  }

  get currentUserCompanyId(): number {
    const result = this._state?.user.organization.id;
    if (typeof result !== 'number')
      throw new Error('currentUserCompanyId ===', result);
    return result;
  }

  get currentUserCompanyName(): string {
    const result = this._state?.user.organization.name;
    if (typeof result !== 'string')
      throw new Error('currentUserCompanyName ===', result);
    return result;
  }

  get permissions(): string[] {
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
