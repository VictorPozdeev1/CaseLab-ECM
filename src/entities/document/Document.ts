import { type DocAttributeValues } from '@api';
// Пока что просто скопировано из DocumentDto, но date: Date, а не string
export interface Document {
  /**
   * ID документа
   */
  id: number;
  /**
   * Название
   */
  name: string;
  /**
   * Пользовательское название документа
   */
  title: string;
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
  ownerId: number;
  /**
   * Тип документа
   */
  docTypeName: string;
  /**
   * Список атрибутов
   */
  attributeValues: DocAttributeValues[];
  /**
   * Статус
   */
  finalDocStatus: string;
}
