import { Service as api } from '@api';
import { CompanyDocumentTypesModel } from '@widgets/CompanyDocumentTypesControlPanel';

class MyCompanyModel {
  _model?: CompanyDocumentTypesModel;
  get myCompanyModel(): CompanyDocumentTypesModel {
    let result = this._model;
    if (result === undefined) {
      result = new CompanyDocumentTypesModel();
      result
        ._loadFromApi(() => api.getDocTypesMyOrganization())
        .then(() => {
          if (result !== undefined) this._model = result;
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
