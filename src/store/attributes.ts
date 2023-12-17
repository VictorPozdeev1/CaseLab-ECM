import { makeAutoObservable, runInAction } from 'mobx';
import { Service } from '@api';
import { type DocAttributeDto } from '@api';

class AttributesStore {
  constructor() {
    makeAutoObservable(this);
  }

  attributes?: DocAttributeDto[];

  filteredAttributes?: DocAttributeDto[];

  async getAttributes(page?: number, sortBy?: string): Promise<void> {
    try {
      const response = await Service.getAllDocTypes1(page, sortBy);
      runInAction(() => {
        this.attributes = response;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async createAttribute(requestBody: DocAttributeDto): Promise<void> {
    try {
      await Service.createAttribute(requestBody);
      runInAction(() => {
        void this.getAttributes();
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getAttributeById(id: number): Promise<DocAttributeDto | undefined> {
    try {
      const res = await Service.getAttribute(id);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteAttributeById(id: number): Promise<void> {
    try {
      await Service.deleteAttribute(id);
      runInAction(() => {
        this.attributes = this.attributes?.filter((el) => el.id !== id);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async updateAttributeById(
    id: number,
    newAttribute: DocAttributeDto,
  ): Promise<void> {
    try {
      const res = await Service.updateAttribute(id, newAttribute);
      runInAction(() => {
        this.attributes = this.attributes?.map((el) =>
          el.id === res.id ? res : el,
        );
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getDocAttributesByNameSubstring(nameSubstring: string): Promise<void> {
    try {
      const res = await Service.getDocAttributesByNameLike(nameSubstring);
      runInAction(() => {
        this.filteredAttributes = res;
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AttributesStore();
