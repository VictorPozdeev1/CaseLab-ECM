/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocAttributeValueCreateDto } from './DocAttributeValueCreateDto';

/**
 * DTO создания объекта
 */
export type DocumentCreateDto = {
  /**
   * ID организации
   */
  idOrganization: number;
  /**
   * Тип документа
   */
  docTypId: number;
  /**
   * Список атрибутов
   */
  docAttributeValueCreateDtos: Array<DocAttributeValueCreateDto>;
};
