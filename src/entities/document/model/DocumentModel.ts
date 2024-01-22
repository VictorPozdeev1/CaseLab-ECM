import { type DocumentDto, type DocAttributeValues } from '@api';

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
  status: string;

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
    this.status = params.finalDocStatus;
  }
}
