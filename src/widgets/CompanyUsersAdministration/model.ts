import { makeAutoObservable, runInAction } from 'mobx';

import { Service as api, type UserCreateDto, type UserUpdateDto } from '@api';
import { User } from '@entities/user';

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  users: User[] = [];

  async loadCompanyUsers(companyId: number): Promise<void> {
    const newUserList = (await api.getUsersByOrganization(companyId)).map(
      (u) => new User(u),
    );
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
      passportNumber: '345987',
      passportSeries: '3454',
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
      passportNumber: '345987',
      passportSeries: '3453',
    };
    const response = await api.createUser(requestDto);
    runInAction(() => this.users.push(new User(response)));
  }
}

class UsersByCompanies {
  constructor() {
    makeAutoObservable(this);
  }

  _usersByCompany: Map<number, UserStore> = new Map<number, UserStore>();

  getUserStoreForCompany(companyId: number): UserStore {
    let result = this._usersByCompany.get(companyId);
    if (result === undefined) {
      result = new UserStore();
      this._usersByCompany.set(companyId, result);
    }
    return result;
  }
}

export default new UsersByCompanies();
