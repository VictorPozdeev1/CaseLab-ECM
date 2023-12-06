import { makeAutoObservable } from 'mobx';
import {
  type DocumentDto,
  Service,
  type DocAttributeValueCreateDto,
} from '@api/generated';
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
      this.documents = response.map((d) => ({
        ...d,
        date: new Date(d.date as unknown as string),
      }));
    } catch (e) {
      console.log(e);
    }
  }

  async createDocument(
    docTypeId: number,
    docAttr: DocAttributeValueCreateDto[],
  ): Promise<void> {
    try {
      if (currentUser.data !== undefined) {
        const res = await Service.createDocument({
          idOrganization: currentUser.data.organizationId,
          docTypId: docTypeId,
          docAttributeValueCreateDtos: docAttr,
        });
        this.documents?.push(res);
      } else {
        console.log('data is undefined');
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default new DocumentsStore();
