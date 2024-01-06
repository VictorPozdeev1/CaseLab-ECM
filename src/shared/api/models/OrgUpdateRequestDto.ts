/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

/**
 * Запрос на обновление организации
 */
export type OrgUpdateRequestDto = {
    /**
     * Название
     */
    name?: string;
    /**
     * ID сотрудника, получающего по-умолчанию документы на согласование
     */
    defaultRecipient?: number;
};
