import { makeAutoObservable, runInAction } from 'mobx';

import type { DocTypeDto, DocAttributeDto } from '@api';
import { DocumentType } from './DocumentType';
import { DocumentAttribute } from './DocumentAttribute';
import { type IPromiseBasedObservable, fromPromise } from 'mobx-utils';

export class CompanyDocumentTypesModel {
  constructor() {
    makeAutoObservable(this);
  }

  documentTypes?: IPromiseBasedObservable<DocumentType[]>;
  documentAttributes?: IPromiseBasedObservable<DocumentAttribute[]>;

  async _loadDocumentAttributes(
    documentAttributesLoader: () => Promise<DocAttributeDto[]>,
  ): Promise<DocumentAttribute[]> {
    const loadedData = await documentAttributesLoader();
    return loadedData.map((a) => new DocumentAttribute(a));
  }

  async _loadDocumentTypes(
    documentTypesLoader: () => Promise<DocTypeDto[]>,
  ): Promise<DocumentType[]> {
    const loadedData = await documentTypesLoader();
    // await Promise.all([this.documentTypes, this.documentTypeAttributes]);
    await this.documentAttributes; // Если будет rejected, дальше выполнение не пойдёт
    // if (this.documentTypeAttributes?.state === 'fulfilled')
    return loadedData.map(
      (dt) =>
        new DocumentType(
          dt,
          // Тут бэкенд должен, по идее, только id атрибутов возвращать
          dt.attributes.map(
            (aDto) =>
              (this.documentAttributes?.value as DocumentAttribute[]).find(
                (a) => a.id === aDto.id,
              ) as DocumentAttribute,
          ),
        ),
    );
  }

  // Может, вообще прямо в конструкторе вызывать?
  async loadModel(
    documentTypesLoader: () => Promise<DocTypeDto[]>,
    documentAttributesLoader: () => Promise<DocAttributeDto[]>,
  ): Promise<void> {
    runInAction(() => {
      this.documentAttributes = fromPromise(
        this._loadDocumentAttributes(documentAttributesLoader),
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
