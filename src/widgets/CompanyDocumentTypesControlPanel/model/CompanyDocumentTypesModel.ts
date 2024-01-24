import { makeAutoObservable, runInAction } from 'mobx';

import { Service as api } from '@api';
import type {
  DocTypeDto,
  DocAttributeDto,
  DocTypeUpdateRequestDto,
  DocTypeCreateDto,
} from '@api';
import { DocumentType } from './DocumentType';
import { DocumentAttribute } from './DocumentAttribute';
import { type IPromiseBasedObservable, fromPromise } from 'mobx-utils';

export class CompanyDocumentTypesModel {
  constructor(companyId: number) {
    this.companyId = companyId;
    makeAutoObservable(this, {}, { deep: true });
  }

  companyId: number;

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
    if (this.documentAttributes?.state !== 'fulfilled')
      throw new Error('Где я?');
    return loadedData.map(
      (dt) =>
        new DocumentType(
          dt,
          this.documentAttributes as IPromiseBasedObservable<
            DocumentAttribute[] // Почему TS сам не выводит после проверки выше?
          >,
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

  async updateDocumentType(
    id: number,
    newData: { name: string; attributeIds: number[] },
  ): Promise<void> {
    const requestDto: DocTypeUpdateRequestDto = {
      name: newData.name,
      attributes: newData.attributeIds,
    };
    const responseDto = await api.updateDocType(id, requestDto);
    runInAction(() => {
      if (
        this.documentTypes?.state !== 'fulfilled' ||
        this.documentAttributes?.state !== 'fulfilled'
      )
        return;
      const indexToUpdate = this.documentTypes.value.findIndex(
        (u) => u.id === id,
      );
      const updatedDocumentType = new DocumentType(
        responseDto,
        this.documentAttributes,
      );

      // Попробовать убрать deep observing (в родительской модели), и затем пробовать более точечные обновления -
      // - и посмотреть, не сломается ли реактивность в какой-то момент.
      // this.documentTypes.value[indexToUpdate] = updatedDocumentType;
      // this.documentTypes.value.splice(index, 1, updatedDocumentType);

      const updatedArray = this.documentTypes.value.map((dt, i) =>
        i === indexToUpdate ? updatedDocumentType : dt,
      );
      this.documentTypes = fromPromise.resolve(updatedArray);
    });
  }

  async createDocumentType(newData: {
    name: string;
    agreementType: DocTypeDto.agreementType;
    attributeIds: number[];
  }): Promise<void> {
    const requestDto: DocTypeCreateDto = {
      name: newData.name,
      agreementType: newData.agreementType,
      attributes: newData.attributeIds,
      organizationId: this.companyId,
    };
    const responseDto = await api.createDocType(requestDto);
    runInAction(() => {
      if (
        this.documentTypes?.state !== 'fulfilled' ||
        this.documentAttributes?.state !== 'fulfilled'
      )
        return;
      const createdDocumentType = new DocumentType(
        responseDto,
        this.documentAttributes,
      );

      // Мутирование не работает. Надо лучше разобраться, почему.
      // this.documentTypes.value.push(createdDocumentType);
      this.documentTypes = fromPromise.resolve([
        ...this.documentTypes.value,
        createdDocumentType,
      ]);
    });
  }
}
