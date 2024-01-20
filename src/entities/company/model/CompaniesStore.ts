import { makeAutoObservable, runInAction } from 'mobx';
import { Service as api } from '@api';
import { Company } from './Company';
import { type OrgUpdateRequestDto } from '@shared/api/models/OrgUpdateRequestDto';

class CompaniesStore {
  companies: Company[] = [];
  selectedCompanyId: number | null = null;
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

  updateSelectedCompany(updatedData: OrgUpdateRequestDto): void {
    if (this.selectedCompanyId !== null) {
      const selectedCompany = this.companies.find(
        (c) => c.id === this.selectedCompanyId,
      );

      if (selectedCompany !== undefined) {
        // Your existing code here
        selectedCompany.name = updatedData.name ?? selectedCompany.name;
        selectedCompany.defaultRecipientId =
          updatedData.defaultRecipient ?? selectedCompany.defaultRecipientId;

        const updatePromise = api.updateOrg(selectedCompany.id, updatedData);

        updatePromise
          .then((updatedOrg) => {
            console.log('Organization updated:', updatedOrg);
          })
          .catch((error) => {
            console.error('Error updating organization:', error);
          });
      }
    }
  }

  setSelectedCompany(id: number): void {
    this.selectedCompanyId = id;
  }

  getSelectedCompany(): Company | undefined {
    return this.companies.find((c) => c.id === this.selectedCompanyId);
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
