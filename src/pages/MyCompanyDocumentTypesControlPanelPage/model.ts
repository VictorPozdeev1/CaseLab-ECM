import { Service as api } from '@api';
import { CompanyDocumentTypesModel } from '@widgets/CompanyDocumentTypesControlPanel';
import { runInAction } from 'mobx';

class MyCompanyModel {
  _instance?: CompanyDocumentTypesModel;
  get instance(): CompanyDocumentTypesModel {
    let result = this._instance;
    if (result === undefined) {
      result = new CompanyDocumentTypesModel();
      result
        ._loadFromApi(
          () => api.getDocTypesMyOrganization(),
          () => api.getAttributesMyOrganization(),
        )
        .then(() => {
          runInAction(() => {
            if (result !== undefined) this._instance = result;
          });
        })
        .catch((error) => {
          throw error;
        });
      // Получается, если ошибка, то result возвращаем, но в _model не добавляем. Приемлемо? Видимо, с mobx-utils было бы лучше.
    }
    return result;
  }
}

const myCompanyModelInstance = new MyCompanyModel();
export { myCompanyModelInstance as myCompanyModel };
