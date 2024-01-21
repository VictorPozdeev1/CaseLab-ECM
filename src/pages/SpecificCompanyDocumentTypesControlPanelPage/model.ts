import { Service as api } from '@api';

import { CompanyDocumentTypesModel } from '@widgets/CompanyDocumentTypesControlPanel';
import { makeAutoObservable, runInAction } from 'mobx';
class ByCompanyModels {
  constructor() {
    makeAutoObservable(this);
  }

  _byCompanyModels: Map<number, CompanyDocumentTypesModel> = new Map<
    number,
    CompanyDocumentTypesModel
  >();

  getCustomCompanyModel(companyId: number): CompanyDocumentTypesModel {
    let result = this._byCompanyModels.get(companyId);
    if (result === undefined) {
      result = new CompanyDocumentTypesModel();
      void result
        ._loadFromApi(
          () => api.getDocTypesByOrganization(companyId),
          () => api.getAttributesByOrganization(companyId),
        )
        .then(() => {
          runInAction(() => {
            if (result !== undefined)
              this._byCompanyModels.set(companyId, result);
          });
        })
        .catch((error) => {
          throw error;
        });
      // Получается, если ошибка, то result возвращаем, но в Map не добавляем. Приемлемо? Видимо, с mobx-utils было бы лучше.
    }
    return result;
  }
}

const byCompanyModelsInstance = new ByCompanyModels();
export { byCompanyModelsInstance as byCompanyModels };
