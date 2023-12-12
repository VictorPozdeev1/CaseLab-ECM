import { makeAutoObservable, runInAction } from 'mobx';
import { Service, type DocTypeDto, type DocTypeCreateDto } from '@api';

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
      this.docTypes?.push(response);
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
}

export default new DocTypes();
