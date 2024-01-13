/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

/**
 * Процесс изменения документа
 */
export type DocProcessDto = {
  /**
   * ID процесса
   */
  id: number;
  /**
   * Документ
   */
  document: number;
  /**
   * Отправитель
   */
  sender: number;
  /**
   * Получатель
   */
  recipientUserId: number;
  /**
   * Организация получатель
   */
  recipientOrganizationId: number;
  /**
   * Статус
   */
  status: string;
  /**
   * Комментарий
   */
  comment: string;
};
