/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { OrgDto } from './OrgDto';

/**
 * Ответ на получение пользователя
 */
export type UserReplyDto = {
  /**
   * ID пользователя
   */
  id: number;
  /**
   * Фамилия
   */
  lastName: string;
  /**
   * Имя
   */
  firstName: string;
  /**
   * Отчество
   */
  patronymic?: string;
  /**
   * Дата рождения
   */
  dateOfBirth: string;
  /**
   * Email
   */
  email: string;
  /**
   * Телефон
   */
  phone: string;
  /**
   * Описание
   */
  post: string;
  /**
   * Роль
   */
  role: string;
  organization: OrgDto;
};
