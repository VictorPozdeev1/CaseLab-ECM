import { makeAutoObservable } from 'mobx';
import {
  type DocumentDto,
  Service,
  type DocAttributeValueCreateDto,
} from '@api/generated';
import CaselabEcmApi from '@api/CaselabEcmApi';
import currentUser from './currentUser';

class DocumentsStore {
  constructor() {
    makeAutoObservable(this);
  }

  documents?: DocumentDto[];

  async getDocuments(): Promise<void> {
    try {
      const creatorId: number = (
        await CaselabEcmApi.getAuthInfo(currentUser.token ?? '')
      ).id;
      const response = await Service.findDocuments(
        undefined,
        undefined,
        undefined,
        creatorId,
      );
      this.documents = response;
    } catch (e) {
      console.log(e);
    }
  }

  async createDocumet(
    idOrg: number,
    docTypeId: number,
    docAttr: DocAttributeValueCreateDto[],
  ): Promise<DocumentDto> {
    try {
      return await Service.createDocument({
        idOrganization: idOrg,
        docTypId: docTypeId,
        docAttributeValueCreateDtos: docAttr,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default new DocumentsStore();
