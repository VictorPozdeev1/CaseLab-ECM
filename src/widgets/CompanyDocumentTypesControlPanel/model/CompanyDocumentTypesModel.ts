import { makeAutoObservable, runInAction } from 'mobx';

import type { DocTypeDto, DocAttributeDto } from '@api';

type DocumentType = DocTypeDto; // Мб, позже класс такой сделаю, если понадобится
type DocumentTypeAttribute = DocAttributeDto; // Мб, позже класс такой сделаю, если понадобится

export class CompanyDocumentTypesModel {
  constructor() {
    makeAutoObservable(this);
  }

  documentTypes: DocumentType[] = [];
  documentTypeAttributes: DocumentTypeAttribute[] = [];

  async _loadFromApi(
    documentTypesLoader: () => Promise<DocumentType[]>,
    documentTypeAttributesLoader: () => Promise<DocumentTypeAttribute[]>,
  ): Promise<void> {
    const documentTypesLoad = documentTypesLoader();
    const documentTypeAttributesLoad = documentTypeAttributesLoader();
    const loadedDocumentTypes = await documentTypesLoad;
    runInAction(() => {
      this.documentTypes = loadedDocumentTypes;
    });
    const loadedDocumentTypeAttributes = await documentTypeAttributesLoad;
    runInAction(() => {
      this.documentTypeAttributes = loadedDocumentTypeAttributes;
    });
  }

  // async updateUser(newData: User): Promise<void> {
  //   const requestDto: UserUpdateDto = {
  //     ...newData,
  //     // Заглушка. Скоро бэкендеры уберут паспортные данные.
  //     passportDate: new Date().toISOString(),
  //     passportIssued: new Date().toISOString(),
  //     passportKp: '333999',
  //     passportNumber: (Date.now() % 1000000).toString(),
  //     passportSeries: '3453',
  //     // Возможно, стоило бы проставлять здесь companyId
  //   };
  //   const response = await api.updateUser(newData.id, requestDto);
  //   const index = this.users.findIndex((u) => u.id === newData.id);
  //   runInAction(() => this.users.splice(index, 1, new User(response)));
  // }

  // async addUser(newData: User): Promise<void> {
  //   const requestDto: UserCreateDto = {
  //     ...newData,
  //     // Заглушка. Скоро бэкендеры уберут паспортные данные.
  //     passportDate: new Date().toISOString(),
  //     passportIssued: new Date().toISOString(),
  //     passportKp: '333999',
  //     passportNumber: (Date.now() % 1000000).toString(),
  //     passportSeries: '3453',
  //     // Возможно, стоило бы проставлять здесь companyId
  //   };
  //   const response = await api.createUser(requestDto);
  //   runInAction(() => this.users.push(new User(response)));
  // }
}
