import { makeAutoObservable, runInAction } from 'mobx';
import {
  Service,
  type DocTypeDto,
  type DocTypeCreateDto,
  type DocAttributeDto,
} from '@api/generated';
class DocTypes {
  constructor() {
    makeAutoObservable(this);
  }

  docTypes?: DocTypeDto[];
  filteredDocTypes?: DocTypeDto[];

  async getAllDocTypes(page?: number, sortBy?: string): Promise<void> {
    try {
      const response = await Service.getAllDocTypes(page, sortBy);
      runInAction(() => {
        this.docTypes = response;
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

  async getDocTypeById(id: number): Promise<DocTypeDto | undefined> {
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
    updType: DocTypeCreateDto,
  ): Promise<void> {
    try {
      const res = await Service.updateDocType(id, updType);
      this.docTypes = this.docTypes?.map((el) => (el.id === res.id ? res : el));
    } catch (e) {
      console.log(e);
    }
  }

  async getDocTypesByNameSubstring(nameSubstring: string): Promise<void> {
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
    agreementType?: string,
  ): Promise<void> {
    try {
      runInAction(() => {
        void this.updateDocTypeById(docTypeId, {
          agreementType,
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
