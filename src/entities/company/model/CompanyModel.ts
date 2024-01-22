import { type OrgDto } from '@api';

export class CompanyModel {
  constructor(apiResponse: OrgDto) {
    this.id = apiResponse.id;
    this.name = apiResponse.name;
    this.inn = apiResponse.inn;
    this.defaultRecipientId = apiResponse.defaultRecipient;
  }

  id: number;
  name: string;
  inn: string;
  defaultRecipientId: number;
}
