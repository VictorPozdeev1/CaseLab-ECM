import { makeAutoObservable, runInAction } from 'mobx';

import {
  Service as api,
  type UserReplyDto,
  type UserCreateDto,
  type UserUpdateDto,
} from '@api';
import { User } from '@entities/user';
import sessionStore from '@store/session';

export class CompanyUsersModel {
  constructor() {
    makeAutoObservable(this);
  }

  users: User[] = [];

  async _loadCompanyUsers(
    usersLoader: () => Promise<UserReplyDto[]>,
  ): Promise<void> {
    const newUserList = (await usersLoader()).map((u) => new User(u));
    runInAction(() => {
      this.users = newUserList;
    });
  }

  async updateUser(newData: User): Promise<void> {
    const requestDto: UserUpdateDto = {
      ...newData,
      // Заглушка. Скоро бэкендеры уберут паспортные данные.
      passportDate: new Date().toISOString(),
      passportIssued: new Date().toISOString(),
      passportKp: '333999',
      passportNumber: (Date.now() % 1000000).toString(),
      passportSeries: '3453',
      // Возможно, стоило бы проставлять здесь companyId
    };
    const response = await api.updateUser(newData.id, requestDto);
    const index = this.users.findIndex((u) => u.id === newData.id);
    runInAction(() => this.users.splice(index, 1, new User(response)));
  }

  async addUser(newData: User): Promise<void> {
    const requestDto: UserCreateDto = {
      ...newData,
      // Заглушка. Скоро бэкендеры уберут паспортные данные.
      passportDate: new Date().toISOString(),
      passportIssued: new Date().toISOString(),
      passportKp: '333999',
      passportNumber: (Date.now() % 1000000).toString(),
      passportSeries: '3453',
      // Возможно, стоило бы проставлять здесь companyId
    };
    const response = await api.createUser(requestDto);
    runInAction(() => this.users.push(new User(response)));
  }
}

class Companies {
  constructor() {
    makeAutoObservable(this);
  }

  _usersByCompany: Map<number, CompanyUsersModel> = new Map<
    number,
    CompanyUsersModel
  >();

  getCustomCompanyUsersStore(companyId: number): CompanyUsersModel {
    let result = this._usersByCompany.get(companyId);
    if (result === undefined) {
      result = new CompanyUsersModel();
      void result._loadCompanyUsers(() =>
        api.getUsersByOrganization(companyId),
      );
      this._usersByCompany.set(companyId, result);
    }
    return result;
  }

  get myCompanyUsersStore(): CompanyUsersModel {
    const companyId = sessionStore.currentUserCompanyId;
    let result = this._usersByCompany.get(companyId);
    if (result === undefined) {
      result = new CompanyUsersModel();
      void result._loadCompanyUsers(() =>
        api.getUsersByOrganization(companyId),
      );
      this._usersByCompany.set(companyId, result);
    }
    return result;
  }
}

export default new Companies();
