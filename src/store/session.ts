import { makeAutoObservable, runInAction } from 'mobx';
import { OpenAPI, Service } from '@api';
import type { CurrentUserData } from '@api/models/UserLoginResponseDto';
import { CurrentUser } from './models/CurrentUser';

const SESSION_DATA = 'sessionData';

const rolesMapping = {
  ADMIN: ['COMPANY_ADMIN', 'SYSTEM_ADMIN'],
  USER: ['USER'],
};
type FullName = Pick<CurrentUserData, 'firstName' | 'lastName' | 'patronymic'>;
const parseFullName = (fullName: string): FullName => {
  return fullName.split(' ').reduce(
    (acc, cur, idx) => {
      switch (idx) {
        case 0:
          acc.firstName = cur;
          break;
        case 1:
          acc.lastName = cur;
          break;
        case 2:
          acc.patronymic = cur;
          break;
      }
      return { ...acc };
    },
    { firstName: '', lastName: '', patronymic: '' } satisfies FullName,
  );
};

class Session {
  private _token: string | null;
  userData: CurrentUser | null;
  protected _rememberUser: boolean;
  constructor() {
    this._token = null;
    this.userData = null;
    this._rememberUser = true; // todo Брать из формы логина
    this._init();
    makeAutoObservable(this);
  }

  private _init(): void {
    const savedSessionDataString = localStorage.getItem(SESSION_DATA);
    if (savedSessionDataString !== null) {
      const { token } = JSON.parse(savedSessionDataString);
      this.token = token;
      this.getUser().catch((e) => {
        console.error(e);
      });
    }
  }

  get isAuth(): boolean {
    return this._token !== null;
  }

  get roles(): string[] {
    if (this?.userData?.role === undefined) return [];
    return rolesMapping[this?.userData.role as keyof typeof rolesMapping] ?? [];
  }

  get token(): string | null {
    return this._token;
  }

  set token(token: string | null) {
    this._token = token;
    OpenAPI.TOKEN = token as string;
  }

  get rememberUser(): boolean {
    return this._rememberUser;
  }

  set rememberUser(value: boolean) {
    this._rememberUser = value;
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const { user, token } = await Service.login({ email, password });
      runInAction(() => {
        this.token = token;
        this.userData = new CurrentUser(user);
      });
      if (this.rememberUser) {
        localStorage.setItem(
          SESSION_DATA,
          JSON.stringify({ token: this.token }),
        );
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getUser(): Promise<void> {
    try {
      const response = await Service.getUserInfo();

      const currentUserName = { ...parseFullName(response.fullName) };
      runInAction(() => {
        this.userData = new CurrentUser({
          ...currentUserName,
          ...response,
          organizationId: response.orgDto?.id as number,
        } satisfies CurrentUserData);
      });
    } catch (error) {
      console.error(error);
    }
  }

  logout(): void {
    try {
      localStorage.removeItem(SESSION_DATA);
      this.token = null;
    } catch (e) {
      console.error(e);
    }
  }
}

export default new Session();
