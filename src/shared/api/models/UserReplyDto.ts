/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { OrgDto } from './OrgDto';
import type { UserPassportDto } from './UserPassportDto';

/**
 * Ответ на получение пользователя
 */
export type UserReplyDto = {
  /**
   * ID пользователя
   */
  id?: number;
  /**
   * ФИО
   */
  fullName?: string;
  /**
   * Дата рождения
   */
  dateOfBirth?: string;
  /**
   * Email
   */
  email?: string;
  /**
   * Телефон
   */
  phone?: string;
  /**
   * Описание
   */
  post?: string;
  /**
   * Роль
   */
  role?: string;
  userPassportDto?: UserPassportDto;
  orgDto?: OrgDto;
};
