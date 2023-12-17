/**
 * Атрибут документа со св-м selected
 */
export interface DocAttributeDtoWithSelected {
  /**
   * ID атрибута
   */
  id?: number;
  /**
   * Наименование атрибута
   */
  name?: string;
  /**
   * Тип атрибута
   */
  type?: string;

  selected: boolean;
}
