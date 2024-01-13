/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

/**
 * Данные об организации
 */
export type OrgDto = {
    /**
     * ID организации
     */
    id: number;
    /**
     * Название
     */
    name: string;
    /**
     * ИНН
     */
    inn: string;
    /**
     * ID сотрудника, получающего по-умолчанию документы на согласование
     */
    defaultRecipient: number;
};
