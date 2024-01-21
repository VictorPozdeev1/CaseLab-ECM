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
