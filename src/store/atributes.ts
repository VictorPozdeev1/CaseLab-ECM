import { makeAutoObservable } from 'mobx';
import { Service } from '@api/generated';
import { type DocAttributeDto } from '@api/generated';
import { currentUserStore } from '.';

class AtributesStore {
  constructor() {
    makeAutoObservable(this);
  }

  atributes?: DocAttributeDto[];

  async getAtributes(page?: number, sortBy?: string): Promise<void> {
    try {
      const response = await Service.getAllDocTypes1(
        currentUserStore.token as string,
        page,
        sortBy,
      );
      this.atributes = response;
      //   localStorage.setItem('atributes', JSON.stringify(response));
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AtributesStore();
