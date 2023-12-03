import { makeAutoObservable } from 'mobx';
import { Service } from '@api/generated';
import { type DocAttributeDto } from '@api/generated';
import { currentUserStore } from '.';

class AttributesStore {
  constructor() {
    makeAutoObservable(this);
  }

  attributes?: DocAttributeDto[];
  filteredAttributes?: DocAttributeDto[];

  async getAttributes(page?: number, sortBy?: string): Promise<void> {
    try {
      const response = await Service.getAllDocTypes1(
        currentUserStore.token as string,
        page,
        sortBy,
      );
      this.attributes = response;
    } catch (e) {
      console.log(e);
    }
  }

  async createAttribute(requestBody: DocAttributeDto): Promise<void> {
    try {
      const res = await Service.createAttribute(
        requestBody,
        currentUserStore.token as string,
      );
      this.attributes?.push(res);
    } catch (e) {
      console.log(e);
    }
  }

  async getAttributeById(id: number): Promise<DocAttributeDto | undefined> {
    try {
      const res = await Service.getAttribute(
        currentUserStore.token as string,
        id,
      );
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  // ошибка cors завел issue
  async deleteAttributeById(id: number): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const res = await Service.deleteAttribute(
        currentUserStore.token as string,
        id,
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  // ошибка cors завел issue
  async updateAttributeById(
    id: number,
    newAttribute: DocAttributeDto,
  ): Promise<void> {
    try {
      const res = await Service.updateAttribute(
        currentUserStore.token as string,
        id,
        newAttribute,
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async getDocAttributesByNameSubstring(nameSubstring: string): Promise<void> {
    try {
      const res = await Service.getDocAttributesByNameLike(
        currentUserStore.token as string,
        nameSubstring,
      );
      this.filteredAttributes = res;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AttributesStore();
