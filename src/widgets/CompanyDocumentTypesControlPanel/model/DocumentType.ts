import { makeAutoObservable } from 'mobx';

import type { DocTypeDto } from '@api';
import { type DocumentAttribute } from './DocumentAttribute';
import { FULFILLED, type IPromiseBasedObservable } from 'mobx-utils';

export class DocumentType {
  constructor(
    apiResponseDto: DocTypeDto,
    attributesStore: IPromiseBasedObservable<DocumentAttribute[]>,
  ) {
    this.id = apiResponseDto.id;
    this.name = apiResponseDto.name;
    this.agreementType = apiResponseDto.agreementType;
    this.companyId = apiResponseDto.organizationId;
    // резолвить в компьютеде?
    if (attributesStore?.state === FULFILLED)
      this.attributes = apiResponseDto.attributes.map(
        // Тут бэкенд должен, по идее, только id атрибутов возвращать
        (aDto) =>
          attributesStore.value.find(
            (a) => a.id === aDto.id,
          ) as DocumentAttribute,
      );

    makeAutoObservable(this); // Возможно, и без этого будет работать, надо проверить
  }

  id: number;
  name: string;
  // Это же вообще компьютед должен быть из attributeId[]? Или нет?
  attributes: DocumentAttribute[] = [];
  agreementType: DocTypeDto.agreementType;
  companyId: number;
}
