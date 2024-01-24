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

  getCompany(id: number): CompanyModel | undefined {
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

  async createCompany(data: { name: string; inn: string }): Promise<void> {
    try {
      const response = await api.createOrg(data);
      runInAction(() => {
        this._companies?.push(new CompanyModel(response));
      });
    } catch (error) {
      console.error('Error creating organization:', error);
    }
  }

  async updateCompany(
    id: number,
    data: { name: string; defaultRecipient: number },
  ): Promise<void> {
    try {
      const updatedOrg = await api.updateOrg(id, data);
      runInAction(() => {
        if (this._companies === undefined) {
          throw new Error('Company store is empty');
        }
        const index = this._companies.findIndex((c) => c.id === id);
        if (index !== -1) {
          this._companies[index] = new CompanyModel(updatedOrg);
        }
      });
    } catch (error) {
      console.error('Error updating organization:', error);
    }
  }

  async deleteCompany(id: number): Promise<void> {
    try {
      await api.deleteOrg(id);
      runInAction(() => {
        if (this._companies === undefined) {
          throw new Error('Company store is empty');
        }
        this._companies = this._companies.filter((c) => c.id !== id);
      });
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  }

  // getCompany(id: number): Company | undefined {
  //   return this._companies.find((c) => c.id === id);
  // }

  getNameById(id: number): string | undefined {
    return this.getCompany(id)?.name;
  }
}

let _companiesStore: CompaniesStore | undefined;
export const getCompaniesStore = (): CompaniesStore => {
  if (_companiesStore === undefined) {
    _companiesStore = new CompaniesStore();
  }
  return _companiesStore;
};
