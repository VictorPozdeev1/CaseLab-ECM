/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { OrgDto } from './OrgDto';

/**
 * Владелец токена
 */
export type UserWithoutPassportDto = {
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
  patronymic: string;
  /**
   * Дата рождения
   */
  dateOfBirth: string;
  /**
   * Email
   */
  email: string;
  /**
   * Номер телефона
   */
  phone: string;
  /**
   * Описание пользователя
   */
  post: string;
  /**
   * Роль пользователя
   */
  role: string;
  organization: OrgDto;
};
