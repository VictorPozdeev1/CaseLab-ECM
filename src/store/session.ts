import { makeAutoObservable, runInAction } from 'mobx';
import { OpenAPI, type OrgDto, Service } from '@api';
import type { CurrentUserData } from '@api/models/UserLoginResponseDto';
import { CurrentUser, type CurrentUserArgs } from './models/CurrentUser';
import { Organization } from './models/Organization';

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
  protected _isUserMemorized: boolean;
  constructor() {
    this._token = null;
    this.userData = null;
    this._isUserMemorized = true; // todo Брать из формы логина
    this._init();
    makeAutoObservable(this);
  }

  protected _init(): void {
    const savedSessionDataString = localStorage.getItem(SESSION_DATA);
    if (savedSessionDataString !== null) {
      const { token } = JSON.parse(savedSessionDataString);
      this.token = token;
      this._fetchUser().catch((e) => {
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

  get isUserMemorized(): boolean {
    return this._isUserMemorized;
  }

  set isUserMemorized(value: boolean) {
    this._isUserMemorized = value;
  }

  protected async _fetchUser(): Promise<void> {
    try {
      const response = await Service.getUserInfo();

      const currentUserName = { ...parseFullName(response.fullName) };
      runInAction(() => {
        this.userData = new CurrentUser({
          ...currentUserName,
          ...response,
          organization: response.orgDto,
        } satisfies CurrentUserArgs);
      });
    } catch (error) {
      console.error(error);
    }
  }

  protected async _fetchOrganization(id: number): Promise<void> {
    try {
      const response = await Service.getOrg(id);

      runInAction(() => {
        if (this.userData === null) return;
        this.userData.organization = new Organization({
          ...response,
        } satisfies OrgDto);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const { user, token } = await Service.login({ email, password });
      runInAction(() => {
        this.token = token;

        this.userData = new CurrentUser(user);
      });

      await this._fetchOrganization(user.organizationId);

      if (this.isUserMemorized) {
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
