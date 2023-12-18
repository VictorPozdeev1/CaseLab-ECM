export interface User {
  /**
   * ID пользователя
   */
  id?: number;
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
  dateOfBirth?: string;
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
   * Название организации
   */
  organizationName: string;
  organizationId?: number;
  /**
   * Роль пользователя
   */
  role?: string;
  /**
   * Описание пользователя
   */
  post?: string;
}
