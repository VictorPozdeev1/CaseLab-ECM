import { makeAutoObservable, runInAction } from 'mobx';

import type { DocTypeDto, DocAttributeDto } from '@api';
import { DocumentType } from './DocumentType';
import { DocumentTypeAttribute } from './DocumentTypeAttribute';
import { type IPromiseBasedObservable, fromPromise } from 'mobx-utils';

export class CompanyDocumentTypesModel {
  constructor() {
    makeAutoObservable(this);
  }

  documentTypes?: IPromiseBasedObservable<DocumentType[]>;
  documentTypeAttributes?: IPromiseBasedObservable<DocumentTypeAttribute[]>;

  async _loadDocumentTypeAttributes(
    documentTypeAttributesLoader: () => Promise<DocAttributeDto[]>,
  ): Promise<DocumentTypeAttribute[]> {
    const loadedData = await documentTypeAttributesLoader();
    return loadedData.map((a) => new DocumentTypeAttribute(a));
  }

  async _loadDocumentTypes(
    documentTypesLoader: () => Promise<DocTypeDto[]>,
  ): Promise<DocumentType[]> {
    const loadedData = await documentTypesLoader();
    // await Promise.all([this.documentTypes, this.documentTypeAttributes]);
    await this.documentTypeAttributes; // Если будет rejected, дальше выполнение не пойдёт
    // if (this.documentTypeAttributes?.state === 'fulfilled')
    return loadedData.map(
      (dt) =>
        new DocumentType(
          dt,
          // Тут бэкенд должен, по идее, только id атрибутов возвращать
          dt.attributes.map(
            (aDto) =>
              (
                this.documentTypeAttributes?.value as DocumentTypeAttribute[]
              ).find((a) => a.id === aDto.id) as DocumentTypeAttribute,
          ),
        ),
    );
  }

  // Может, вообще прямо в конструкторе вызывать?
  async loadModel(
    documentTypesLoader: () => Promise<DocTypeDto[]>,
    documentTypeAttributesLoader: () => Promise<DocAttributeDto[]>,
  ): Promise<void> {
    runInAction(() => {
      this.documentTypeAttributes = fromPromise(
        this._loadDocumentTypeAttributes(documentTypeAttributesLoader),
      );
    });

    runInAction(() => {
      this.documentTypes = fromPromise(
        this._loadDocumentTypes(documentTypesLoader),
      );
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
