import { type DocumentDto, type DocAttributeValues } from '@api';
import { type DocumentStatusType } from '..';

export class DocumentModel {
  id: number;
  name: string;
  title: string;
  documentLink: string;
  date: Date;
  idOrganization: number;
  ownerId: number;
  type: string;
  attributes: DocAttributeValues[];
  status: DocumentStatusType;

  constructor(params: DocumentDto) {
    this.id = params.id;
    this.name = params.name;
    this.title = params.title;
    this.documentLink = params.documentPath;
    this.date = new Date(params.date);
    this.idOrganization = params.idOrganization;
    this.ownerId = params.ownerId;
    this.type = params.docTypeName;
    this.attributes = params.attributeValues;
    this.status = params.finalDocStatus as DocumentStatusType;
  }
}
