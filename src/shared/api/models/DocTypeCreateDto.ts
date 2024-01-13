/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

/**
 * DTO создания типа
 */
export type DocTypeCreateDto = {
    /**
     * Название типа
     */
    name: string;
    /**
     * Для согласования документа требуется: EVERYONE - все получатели, ANYONE - хотя бы один, QUORUM - не менее 50% получателей.
     */
    agreementType: DocTypeCreateDto.agreementType;
    /**
     * Организация
     */
    organizationId: number;
    /**
     * Список уникальных идентификаторов атрибутов
     */
    attributes: Array<number>;
};

export namespace DocTypeCreateDto {

    /**
     * Для согласования документа требуется: EVERYONE - все получатели, ANYONE - хотя бы один, QUORUM - не менее 50% получателей.
     */
    export enum agreementType {
        EVERYONE = 'EVERYONE',
        ANYONE = 'ANYONE',
        QUORUM = 'QUORUM',
    }


}
