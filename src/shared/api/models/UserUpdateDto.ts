/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

/**
 * Данные для обновления пользователя
 */
export type UserUpdateDto = {
  /**
   * Фамилия
   */
  lastName?: string;
  /**
   * Имя
   */
  firstName?: string;
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
  email?: string;
  /**
   * Номер телефона
   */
  phone?: string;
  /**
   * Серия паспорта
   */
  passportSeries?: string;
  /**
   * Номер паспорта
   */
  passportNumber?: string;
  /**
   * Кем выдан паспорт
   */
  passportIssued?: string;
  /**
   * Дата выдачи паспорта
   */
  passportDate?: string;
  /**
   * Код подразделения
   */
  passportKp?: string;
  /**
   * ID организации
   */
  organizationId?: number;
  /**
   * Роль пользователя
   */
  role?: string;
  /**
   * Описание пользователя
   */
  post?: string;
};
