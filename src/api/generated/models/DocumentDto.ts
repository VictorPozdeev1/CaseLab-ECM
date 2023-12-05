/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocAttributeValues } from './DocAttributeValues';

/**
 * Документ
 */
export type DocumentDto = {
  id: number;
  /**
   * Название
   */
  name: string;
  /**
   * Путь документа
   */
  documentPath: string;
  /**
   * Дата последнего обновления
   */
  date: Date;
  /**
   * ID организации
   */
  idOrganization: number;
  /**
   * ID создателя
   */
  ownerId?: number;
  /**
   * Тип документа
   */
  docTypeName: string;
  /**
   * Список атрибутов
   */
  attributeValues: Array<DocAttributeValues>;
  /**
   * Статус
   */
  finalDocStatus?: string;
};
