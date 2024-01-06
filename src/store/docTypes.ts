import { makeAutoObservable, runInAction } from 'mobx';
import {
  Service,
  type DocTypeDto,
  type DocTypeCreateDto,
  type DocAttributeDto,
  type DocTypeUpdateRequestDto,
} from '@api';

import session from './session';

// Мб, нужны отдельные сторы для страницы редактирования типов документов и для формы создания документа. Надо подумать позже.

class DocTypes {
  constructor() {
    makeAutoObservable(this);
  }

  docTypes?: DocTypeDto[];
  filteredDocTypes?: DocTypeDto[];

  async loadAllForMyCompany(): Promise<void> {
    try {
      const response = await Service.getAllDocTypes(
        0,
        1000,
        undefined,
        session.currentUserCompanyId,
      );
      runInAction(() => {
        this.docTypes = response.content;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async addAttributeForType(
    docTypeId: number,
    docAttributeId: number,
  ): Promise<void> {
    try {
      const response = await Service.addAttributeToType(
        docTypeId,
        docAttributeId,
      );
      console.log(response);
      this.docTypes?.map((type) => (type.id === docTypeId ? response : type));
    } catch (e) {
      console.log(e);
    }
  }

  async createDocType(newType: DocTypeCreateDto): Promise<void> {
    try {
      const response = await Service.createDocType(newType);
      console.log(response);
      runInAction(() => {
        this.docTypes?.push({ ...response, attributes: [] });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async loadDocTypeById(id: number): Promise<DocTypeDto | undefined> {
    try {
      const res = await Service.getDocType(id);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteDocTypeById(id: number): Promise<void> {
    try {
      await Service.deleteDocType(id);
      this.docTypes = this.docTypes?.filter((el) => el.id !== id);
    } catch (e) {
      console.log(e);
    }
  }

  async updateDocTypeById(
    id: number,
    updType: DocTypeUpdateRequestDto,
  ): Promise<void> {
    try {
      const res = await Service.updateDocType(id, updType);
      this.docTypes = this.docTypes?.map((el) => (el.id === res.id ? res : el));
    } catch (e) {
      console.log(e);
    }
  }

  async loadDocTypesByNameSubstring(nameSubstring: string): Promise<void> {
    try {
      const res = await Service.getDocTypesByNameLike(nameSubstring);
      this.filteredDocTypes = res;
    } catch (e) {
      console.log(e);
    }
  }

  /// /todo переписать как только бекэнд добавит запрос в api для добавления к типу сразу массива атрибутов
  async updateDocType(
    docTypeId: number,
    agreementName: string,
    attributesArray: DocAttributeDto[],
    // agreementType?: string,                   // Этого пока нет в апи - если это надо, то написать бэкендерам
  ): Promise<void> {
    try {
      runInAction(() => {
        void this.updateDocTypeById(docTypeId, {
          // agreementType,
          name: agreementName,
        });
        // пока отключу добавление атрибутов, т.к. на севрере работает не корректно

        // attributesArray.forEach((attr) => {
        //   void this.addAttributeForType(docTypeId, attr.id as number);
        // });
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new DocTypes();
