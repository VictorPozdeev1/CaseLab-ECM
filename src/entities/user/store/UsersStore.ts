import { makeAutoObservable, runInAction } from 'mobx';
import { User } from '../model/User';
import { asyncWrapper } from '@shared/utils/asyncWrapper';
import { Service } from '@api';

class UsersStore {
  protected _allUsers?: User[];
  protected _usersByCompany?: User[];
  protected _ownCompanyUsers?: User[];

  constructor() {
    makeAutoObservable(this);
  }

  get allUsers(): User[] | undefined {
    return this._allUsers ?? undefined;
  }

  get usersByCompany(): User[] | undefined {
    return this._usersByCompany ?? undefined;
  }

  get ownCompanyUsers(): User[] | undefined {
    return this._ownCompanyUsers ?? undefined;
  }

  loadAllUsers = asyncWrapper(
    async (ids?: number[], page?: number, size?: number, sort?: string[]) => {
      const response = await Service.getUsers(ids, page, size, sort);
      if (response?.content === undefined) {
        throw new Error('Не удалось загрузить пользователей');
      }
      runInAction(() => {
        this._allUsers = response.content?.map((user) => new User(user));
      });
    },
  );

  loadUsersByCompany = asyncWrapper(async (companyId: number) => {
    const response = await Service.getUsersByOrganization(companyId);
    if (response === undefined) {
      throw new Error('Не удалось загрузить пользователей');
    }
    runInAction(() => {
      this._usersByCompany = response?.map((user) => new User(user));
    });
  });

  loadOwnCompanyUsers = asyncWrapper(async () => {
    const response = await Service.getUsersMyOrganization();
    if (response === undefined) {
      throw new Error('Не удалось загрузить пользователей');
    }
    runInAction(() => {
      this._ownCompanyUsers = response?.map((user) => new User(user));
    });
  });
}
export const usersStore = new UsersStore();
