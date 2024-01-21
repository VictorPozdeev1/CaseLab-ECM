import { makeAutoObservable } from 'mobx';

import type { DocTypeDto } from '@api';
import { type DocumentAttribute } from './DocumentAttribute';

export class DocumentType {
  constructor(
    apiResponse: DocTypeDto,
    attributesList: DocumentAttribute[] = [],
  ) {
    this.id = apiResponse.id;
    this.name = apiResponse.name;
    this.agreementType = apiResponse.agreementType;
    this.companyId = apiResponse.organizationId;
    this.attributes = attributesList;
    makeAutoObservable(this); // Возможно, и без этого будет работать, надо проверить
  }

  id: number;
  name: string;
  attributes: DocumentAttribute[];
  agreementType: DocTypeDto.agreementType;
  companyId: number;
}
