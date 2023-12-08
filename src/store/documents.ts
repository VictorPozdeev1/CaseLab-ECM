import { makeAutoObservable, runInAction } from 'mobx';
import { type DocumentDto, Service } from '@api/generated';
import currentUser from './currentUser';

class DocumentsStore {
  constructor() {
    makeAutoObservable(this);
  }

  documents?: DocumentDto[];

  // todo сделать норм
  get ownDocuments(): DocumentDto[] | undefined {
    return this.documents;
  }

  async getDocuments(): Promise<void> {
    try {
      const creatorId: number = (await Service.getUserInfo()).id;
      const response = await Service.findDocuments(
        undefined,
        undefined,
        undefined,
        creatorId,
      );
      runInAction(() => {
        this.documents = response.map((d) => ({
          ...d,
          date: new Date(d.date as unknown as string),
        }));
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async createDocument(
    docTypeId: number,
    attributeValues: Map<number, string>,
  ): Promise<void> {
    try {
      if (currentUser.data !== undefined) {
        const res = await Service.createDocument({
          idOrganization: currentUser.data.organizationId,
          docTypId: docTypeId,
          docAttributeValueCreateDtos: Array.from(
            attributeValues,
            ([attributeId, value]) => ({ attributeId, value }),
          ),
        });
        runInAction(() => {
          this.documents?.push(res);
        });
      } else {
        // todo: Разобраться, как сделать, чтобы не писать эту проверку во всех методах. Декоратор использовать, мб?
        throw new Error(
          'currentUser.data is undefined. Probably, user is not logged in.',
        );
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default new DocumentsStore();
