/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocAttributeValueCreateDto } from './DocAttributeValueCreateDto';

/**
 * DTO создания объекта
 */
export type DocumentCreateDto = {
  /**
   * Тип документа
   */
  docTypeId: number;
  /**
   * Пользовательское название документа
   */
  title: string;
  /**
   * Список атрибутов
   */
  attributeValues: Array<DocAttributeValueCreateDto>;
};
