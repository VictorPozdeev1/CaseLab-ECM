import { type DocAttributeDto } from '@api';
import { makeAutoObservable } from 'mobx';

export class DocumentAttribute {
  constructor(apiResponse: DocAttributeDto) {
    this.id = apiResponse.id;
    this.name = apiResponse.name;
    this.type = apiResponse.type;
    this.companyId = apiResponse.organizationId;
    makeAutoObservable(this); // Возможно, и без этого будет работать, надо проверить
  }

  id: number;
  name: string;
  type: string;
  companyId: number;
}
