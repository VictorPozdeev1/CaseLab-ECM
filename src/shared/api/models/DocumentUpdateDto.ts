/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocAttributeValueCreateDto } from './DocAttributeValueCreateDto';

/**
 * DTO изменения документа
 */
export type DocumentUpdateDto = {
  /**
   * Название
   */
  name?: string;
  /**
   * Пользовательское название документа
   */
  title?: string;
  /**
   * Путь документа
   */
  documentPath?: string;
  /**
   * Дата обновления
   */
  date?: string;
  /**
   * ID типа
   */
  docTypeId?: number;
  /**
   * Предыдущая версия
   */
  previousVersion?: string;
  /**
   * Список атрибутов
   */
  attributeValues?: Array<DocAttributeValueCreateDto>;
};
