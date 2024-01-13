/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocAttributeDto } from './DocAttributeDto';

/**
 * Тип документа
 */
export type DocTypeDto = {
    /**
     * ID типа документа
     */
    id: number;
    /**
     * Наименование типа
     */
    name: string;
    /**
     * Аттрибуты привязанные к типу
     */
    attributes: Array<DocAttributeDto>;
    /**
     * Для согласования документа требуется: EVERYONE - все получатели, ANYONE - хотя бы один, QUORUM - не менее 50% получателей.
     */
    agreementType: DocTypeDto.agreementType;
    /**
     * ID организации
     */
    organizationId: number;
};

export namespace DocTypeDto {

    /**
     * Для согласования документа требуется: EVERYONE - все получатели, ANYONE - хотя бы один, QUORUM - не менее 50% получателей.
     */
    export enum agreementType {
        QUORUM = 'QUORUM',
        ANYONE = 'ANYONE',
        EVERYONE = 'EVERYONE',
    }


}
