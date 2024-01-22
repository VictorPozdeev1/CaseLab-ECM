import { makeAutoObservable, runInAction } from 'mobx';

import { Service as api } from '@api';
import { CompanyModel } from './CompanyModel';
import { asyncWrapper } from '@shared/utils/asyncWrapper';

class CompaniesStore {
  protected _companies?: CompanyModel[];

  constructor() {
    makeAutoObservable(this);
  }

  get companies(): CompanyModel[] | undefined {
    return this._companies ?? undefined;
  }

  getById(id: number): CompanyModel | undefined {
    return this._companies !== undefined
      ? this._companies.find((el) => el.id === id)
      : undefined;
  }

  loadCompanies = asyncWrapper(
    async (page?: number, size?: number, sort?: string[]): Promise<void> => {
      const response = await api.getAllOrgs(page, size, sort);
      if (response?.content === undefined) {
        throw new Error('Не удалось загрузить организации');
      }
      runInAction(() => {
        const companiesEntries = response.content;
        if (companiesEntries !== undefined) {
          this._companies = companiesEntries.map((el) => new CompanyModel(el));
        }
      });
    },
  );
}

let _companiesStore: CompaniesStore | undefined;
export const getCompaniesStore = (): CompaniesStore => {
  if (_companiesStore === undefined) {
    _companiesStore = new CompaniesStore();
  }
  return _companiesStore;
};
