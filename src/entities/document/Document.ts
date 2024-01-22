import { type DocAttributeValues } from '@api';
// Пока что просто скопировано из DocumentDto, но date: Date, а не string
export interface Document {
  id: number;
  name: string;
  title: string;
  documentPath: string;
  date: Date;
  idOrganization: number;
  ownerId: number;
  docTypeName: string;
  attributeValues: DocAttributeValues[];
  finalDocStatus: string;
}
