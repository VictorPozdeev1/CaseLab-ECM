import { type DocProcessDto } from '@api';

export class ProcessModel {
  id: number;
  document: number;
  sender: number;
  recipient: number;
  comment: string;
  status: string;
  recipientOrganization: number;

  constructor(params: DocProcessDto) {
    this.id = params.id;
    this.document = params.document;
    this.sender = params.sender;
    this.recipient = params.recipientUserId;
    this.comment = params.comment;
    this.status = params.status;
    this.recipientOrganization = params.recipientOrganizationId;
  }
}
