/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

/**
 * Изменения в документе
 */
export type DocumentChangesDto = {
    /**
     * ID изменения
     */
    id: number;
    /**
     * ID документа
     */
    documentId: number;
    /**
     * Дата изменения
     */
    dateChange: string;
    /**
     * Изменения
     */
    changes: string;
    /**
     * Предыдущая версия
     */
    previousVersion: string;
    /**
     * ID автора изменения
     */
    userChangerId: number;
};
