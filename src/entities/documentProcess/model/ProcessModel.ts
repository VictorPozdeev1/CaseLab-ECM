import { type DocProcessDto } from '@api';
import { type DocumentStatusUnion } from '@entities/document/const/DocumentStatus';

export class ProcessModel {
  id: number;
  document: number;
  sender: number;
  recipient: number;
  comment: string;
  status: DocumentStatusUnion;
  recipientOrganization: number;

  constructor(params: DocProcessDto) {
    this.id = params.id;
    this.document = params.document;
    this.sender = params.sender;
    this.recipient = params.recipientUserId;
    this.comment = params.comment;
    this.status = params.status as DocumentStatusUnion;
    this.recipientOrganization = params.recipientOrganizationId;
  }
}
