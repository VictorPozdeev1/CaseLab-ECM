import { makeAutoObservable } from 'mobx';

import { Service as api } from '@api';
import { User } from '@entities/user';

class UsersByCompanies {
  usersByCompany: Map<number, User[]> = new Map<number, User[]>();
  async loadCompanyUsers(companyId: number): Promise<void> {
    // В новом релизе будет метод для получения пользователей организации
    const loadedUsers = (await api.getAllUsers())
      .filter((u) => u.orgDto?.id === companyId)
      .map((u) => new User(u));
    this.usersByCompany.set(companyId, loadedUsers);
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default new UsersByCompanies();
