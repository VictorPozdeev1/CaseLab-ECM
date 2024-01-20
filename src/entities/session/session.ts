import { makeAutoObservable, runInAction } from 'mobx';
import { OpenAPI, Service } from '@api';
import type { AuthTokenDto } from '@api';
import { User, type Roles } from '@entities/user';

type SessionData = AuthTokenDto;

const SESSION_DATA = 'sessionData';

export enum Permissions {
  MY_DOCUMENTS,
  DOCUMENT_TYPES, // Будет убрано, когда займусь типами документов
  MY_COMPANY_CONTROL_PANEL,
  SPECIFIC_COMPANY_CONTROL_PANEL,
  USER, // Надо будет разбить этот пермишн на отдельные
}

const rolesPermissions: Record<Roles, Permissions[]> = {
  ADMIN: [
    Permissions.DOCUMENT_TYPES, // Будет изменено, когда займусь типами документов
    Permissions.SPECIFIC_COMPANY_CONTROL_PANEL,
  ],
  COMPANY_ADMIN: [Permissions.MY_COMPANY_CONTROL_PANEL],
  USER: [Permissions.USER, Permissions.MY_DOCUMENTS],
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

  get permissions(): Permissions[] {
    if (this._state?.user?.role === undefined) return [];
    return (
      rolesPermissions[
        this._state.user.role as keyof typeof rolesPermissions
      ] ?? []
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
