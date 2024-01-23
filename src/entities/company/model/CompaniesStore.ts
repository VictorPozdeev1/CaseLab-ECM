import { makeAutoObservable, runInAction } from 'mobx';
import { Service as api } from '@api';
import { Company } from './Company';

class CompaniesStore {
  companies: Company[] = [];
  constructor() {
    makeAutoObservable(this, {});
  }

  async _loadCompanies(): Promise<void> {
    // content должен быть required, как я понимаю
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    const newCompaniesList = (await api.getAllOrgs()).content!.map(
      (o) => new Company(o),
    );
    runInAction(() => {
      this.companies = newCompaniesList;
    });
  }

  async createCompany(data: { name: string; inn: string }): Promise<void> {
    try {
      const response = await api.createOrg(data);
      runInAction(() => {
        this.companies.push(new Company(response));
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
        const index = this.companies.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.companies[index] = new Company(updatedOrg);
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
        this.companies = this.companies.filter((c) => c.id !== id);
      });
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  }

  getCompany(id: number): Company | undefined {
    return this.companies.find((c) => c.id === id);
  }

  getNameById(id: number): string | undefined {
    return this.companies.find((c) => c.id === id)?.name;
  }
}

let _companiesStore: CompaniesStore | undefined;
export const getCompaniesStore = (): CompaniesStore => {
  if (_companiesStore === undefined) {
    _companiesStore = new CompaniesStore();
    void _companiesStore._loadCompanies();
  }
  return _companiesStore;
};
