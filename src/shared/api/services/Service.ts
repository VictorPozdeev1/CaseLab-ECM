/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */
import type { AuthTokenDto } from '../models/AuthTokenDto';
import type { CountOrgDto } from '../models/CountOrgDto';
import type { CountUsersDto } from '../models/CountUsersDto';
import type { DocAttributeCreateDto } from '../models/DocAttributeCreateDto';
import type { DocAttributeDto } from '../models/DocAttributeDto';
import type { DocAttributeUpdateRequestDto } from '../models/DocAttributeUpdateRequestDto';
import type { DocProcessDto } from '../models/DocProcessDto';
import type { DocStatisticDTO } from '../models/DocStatisticDTO';
import type { DocTypeCreateDto } from '../models/DocTypeCreateDto';
import type { DocTypeDto } from '../models/DocTypeDto';
import type { DocTypeUpdateRequestDto } from '../models/DocTypeUpdateRequestDto';
import type { DocumentChangesDto } from '../models/DocumentChangesDto';
import type { DocumentCreateDto } from '../models/DocumentCreateDto';
import type { DocumentDto } from '../models/DocumentDto';
import type { DocumentUpdateDto } from '../models/DocumentUpdateDto';
import type { OrgCreateRequestDto } from '../models/OrgCreateRequestDto';
import type { OrgDto } from '../models/OrgDto';
import type { OrgUpdateRequestDto } from '../models/OrgUpdateRequestDto';
import type { PageDocAttributeDto } from '../models/PageDocAttributeDto';
import type { PageDocTypeDto } from '../models/PageDocTypeDto';
import type { PageDocumentChangesDto } from '../models/PageDocumentChangesDto';
import type { PageDocumentDto } from '../models/PageDocumentDto';
import type { PageOrgDto } from '../models/PageOrgDto';
import type { PageUserReplyDto } from '../models/PageUserReplyDto';
import type { PasswordDto } from '../models/PasswordDto';
import type { UserCreateDto } from '../models/UserCreateDto';
import type { UserCredentialsDto } from '../models/UserCredentialsDto';
import type { UserRatingDto } from '../models/UserRatingDto';
import type { UserReplyDto } from '../models/UserReplyDto';
import type { UserUpdateDto } from '../models/UserUpdateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { RequestDecorator as __request } from '@api/requestDecorator';

export class Service {
  /**
   * Добавить атрибут к типу
   * @param docTypeId ID типа
   * @param docAttributeId ID атрибута
   * @returns DocTypeDto OK
   * @throws ApiError
   */
  public static addAttributeToType(
    docTypeId: number,
    docAttributeId: number,
  ): CancelablePromise<DocTypeDto> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/v2/doctypes/{docTypeId}/attributes/{docAttributeId}',
      path: {
        docTypeId: docTypeId,
        docAttributeId: docAttributeId,
      },
    });
  }

  /**
   * Получить всех пользователей
   * @param page Zero-based page index (0..N)
   * @param size The size of the page to be returned
   * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param orgId ID организации
   * @returns PageUserReplyDto OK
   * @throws ApiError
   */
  public static getAllUsers(
    page?: number,
    size: number = 20,
    sort?: Array<string>,
    orgId?: number,
  ): CancelablePromise<PageUserReplyDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/users',
      query: {
        page: page,
        size: size,
        sort: sort,
        org_id: orgId,
      },
    });
  }

  /**
   * Добавить пользователя
   * @param requestBody
   * @returns UserReplyDto Created
   * @throws ApiError
   */
  public static createUser(
    requestBody: UserCreateDto,
  ): CancelablePromise<UserReplyDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v2/users',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Установить пароль для пользователя
   * @param userId ID пользователя
   * @param requestBody
   * @returns any OK
   * @throws ApiError
   */
  public static setUserPassword(
    userId: number,
    requestBody: PasswordDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v2/users/password/{userId}',
      path: {
        userId: userId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Получить все организации
   * @param page Zero-based page index (0..N)
   * @param size The size of the page to be returned
   * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @returns PageOrgDto OK
   * @throws ApiError
   */
  public static getAllOrgs(
    page?: number,
    size: number = 20,
    sort?: Array<string>,
  ): CancelablePromise<PageOrgDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/org',
      query: {
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * Добавить организацию
   * @param requestBody
   * @returns OrgDto Created
   * @throws ApiError
   */
  public static createOrg(
    requestBody: OrgCreateRequestDto,
  ): CancelablePromise<OrgDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v2/org',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Получить документы по своей организации
   * @param text Имя документа
   * @param rangeStart Начало интервала
   * @param rangeEnd Конец интервала
   * @param creatorId ID создателя документа
   * @param page Zero-based page index (0..N)
   * @param size The size of the page to be returned
   * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param typeId ID типа документа
   * @param attributeId ID атрибута документа
   * @param attributeValue Значение атрибута
   * @returns PageDocumentDto OK
   * @throws ApiError
   */
  public static findDocuments(
    text?: string,
    rangeStart?: string,
    rangeEnd?: string,
    creatorId?: number,
    page?: number,
    size: number = 20,
    sort?: Array<string>,
    typeId?: number,
    attributeId?: number,
    attributeValue?: string,
  ): CancelablePromise<PageDocumentDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/document',
      query: {
        text: text,
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
        creatorId: creatorId,
        page: page,
        size: size,
        sort: sort,
        typeId: typeId,
        attributeId: attributeId,
        attributeValue: attributeValue,
      },
    });
  }

  /**
   * Добавить новый документ
   * @param requestBody
   * @returns DocumentDto OK
   * @throws ApiError
   */
  public static createDocument(
    requestBody: DocumentCreateDto,
  ): CancelablePromise<DocumentDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v2/document',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Создать запрос на согласование
   * @param documentId ID документа
   * @param recipientId ID получателя
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static createNewProcess(
    documentId: number,
    recipientId: number,
  ): CancelablePromise<DocProcessDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v2/document/{documentId}/recipient/{recipientId}/new-process',
      path: {
        documentId: documentId,
        recipientId: recipientId,
      },
    });
  }

  /**
   * Создать запрос на согласование с учетом компании получателя
   * @param documentId ID документа
   * @param companyId ID компании получателя
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static createNewProcessWithCompany(
    documentId: number,
    companyId: number,
  ): CancelablePromise<DocProcessDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v2/document/{documentId}/company/{companyId}/new-process',
      path: {
        documentId: documentId,
        companyId: companyId,
      },
    });
  }

  /**
   * Получить все типы
   * Все типы с пагинацией и сортировкой
   * @param page Zero-based page index (0..N)
   * @param size The size of the page to be returned
   * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param orgId ID организации
   * @returns PageDocTypeDto OK
   * @throws ApiError
   */
  public static getAllDocTypes(
    page?: number,
    size: number = 20,
    sort?: Array<string>,
    orgId?: number,
  ): CancelablePromise<PageDocTypeDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/doctypes',
      query: {
        page: page,
        size: size,
        sort: sort,
        org_id: orgId,
      },
    });
  }

  /**
   * Создать тип
   * @param requestBody
   * @returns DocTypeDto Created
   * @throws ApiError
   */
  public static createDocType(
    requestBody: DocTypeCreateDto,
  ): CancelablePromise<DocTypeDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v2/doctypes',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Получить все атрибуты
   * Все атрибуты с пагинацией и сортировкой
   * @param page Zero-based page index (0..N)
   * @param size The size of the page to be returned
   * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param orgId ID организации
   * @returns PageDocAttributeDto OK
   * @throws ApiError
   */
  public static getAllDocTypes1(
    page?: number,
    size: number = 20,
    sort?: Array<string>,
    orgId?: number,
  ): CancelablePromise<PageDocAttributeDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/docattributes',
      query: {
        page: page,
        size: size,
        sort: sort,
        org_id: orgId,
      },
    });
  }

  /**
   * Создать атрибут
   * @param requestBody
   * @returns DocAttributeDto Created
   * @throws ApiError
   */
  public static createAttribute(
    requestBody: DocAttributeCreateDto,
  ): CancelablePromise<DocAttributeDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v2/docattributes',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Авторизация
   * @param requestBody
   * @returns AuthTokenDto OK
   * @throws ApiError
   */
  public static login(
    requestBody: UserCredentialsDto,
  ): CancelablePromise<AuthTokenDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v2/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Получить пользователя по ID
   * @param userId ID пользователя
   * @returns UserReplyDto OK
   * @throws ApiError
   */
  public static getUser(userId: number): CancelablePromise<UserReplyDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/users/{userId}',
      path: {
        userId: userId,
      },
    });
  }

  /**
   * Удалить пользователя
   * @param userId ID пользователя
   * @returns void
   * @throws ApiError
   */
  public static deleteUser(userId: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v2/users/{userId}',
      path: {
        userId: userId,
      },
    });
  }

  /**
   * Изменить пользователя
   * @param userId ID пользователя
   * @param requestBody
   * @returns UserReplyDto OK
   * @throws ApiError
   */
  public static updateUser(
    userId: number,
    requestBody: UserUpdateDto,
  ): CancelablePromise<UserReplyDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v2/users/{userId}',
      path: {
        userId: userId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Получить организацию по Id
   * @param orgId ID организации
   * @returns OrgDto OK
   * @throws ApiError
   */
  public static getOrg(orgId: number): CancelablePromise<OrgDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/org/{orgId}',
      path: {
        orgId: orgId,
      },
    });
  }

  /**
   * Удалить организацию
   * @param orgId ID организации
   * @returns OrgDto OK
   * @throws ApiError
   */
  public static deleteOrg(orgId: number): CancelablePromise<OrgDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v2/org/{orgId}',
      path: {
        orgId: orgId,
      },
    });
  }

  /**
   * Изменить организацию.
   * При запросе от ADMIN по указанной компании, для остальных ролей обновиться своя компания.
   * @param orgId ID организации
   * @param requestBody
   * @returns OrgDto OK
   * @throws ApiError
   */
  public static updateOrg(
    orgId: number,
    requestBody: OrgUpdateRequestDto,
  ): CancelablePromise<OrgDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v2/org/{orgId}',
      path: {
        orgId: orgId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Получить документ по ID
   * @param documentId ID документа
   * @returns DocumentDto OK
   * @throws ApiError
   */
  public static getDocumentById(
    documentId: number,
  ): CancelablePromise<DocumentDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/document/{documentId}',
      path: {
        documentId: documentId,
      },
    });
  }

  /**
   * Удалить документ
   * @param documentId ID документа
   * @returns any OK
   * @throws ApiError
   */
  public static deleteDocument(documentId: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v2/document/{documentId}',
      path: {
        documentId: documentId,
      },
    });
  }

  /**
   * Изменить документ
   * @param documentId ID документа
   * @param requestBody
   * @returns DocumentDto OK
   * @throws ApiError
   */
  public static updateDocument(
    documentId: number,
    requestBody: DocumentUpdateDto,
  ): CancelablePromise<DocumentDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v2/document/{documentId}',
      path: {
        documentId: documentId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Отправить документ на доработку
   * @param processId ID процесса
   * @param comment Комментарий
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static sendToCorrection(
    processId: any,
    comment?: any,
  ): CancelablePromise<DocProcessDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v2/document/processes/{processId}/send-to-correction',
      path: {
        processId: processId,
      },
      query: {
        comment: comment,
      },
    });
  }

  /**
   * Отправить документ на согласование
   * @param processId ID процесса
   * @param comment Комментарий
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static sendToApprove(
    processId: any,
    comment?: any,
  ): CancelablePromise<DocProcessDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v2/document/processes/{processId}/send-to-approve',
      path: {
        processId: processId,
      },
      query: {
        comment: comment,
      },
    });
  }

  /**
   * Отклонить документ
   * @param processId ID процесса
   * @param comment Комментарий
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static reject(
    processId: any,
    comment?: any,
  ): CancelablePromise<DocProcessDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v2/document/processes/{processId}/reject',
      path: {
        processId: processId,
      },
      query: {
        comment: comment,
      },
    });
  }

  /**
   * Делегировать согласование документа
   * @param recipientId ID сотрудника
   * @param processId ID процесса
   * @param comment Комментарий
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static delegateToOtherUser(
    recipientId: number,
    processId: any,
    comment?: any,
  ): CancelablePromise<DocProcessDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v2/document/processes/{processId}/delegate-to-other-user/{recipientId}',
      path: {
        recipientId: recipientId,
        processId: processId,
      },
      query: {
        comment: comment,
      },
    });
  }

  /**
   * Согласовать документ
   * @param processId ID процесса
   * @param comment Комментарий
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static approve(
    processId: any,
    comment?: any,
  ): CancelablePromise<DocProcessDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v2/document/processes/{processId}/approve',
      path: {
        processId: processId,
      },
      query: {
        comment: comment,
      },
    });
  }

  /**
   * Получить тип по ID
   * @param docTypeId ID типа
   * @returns DocTypeDto OK
   * @throws ApiError
   */
  public static getDocType(docTypeId: number): CancelablePromise<DocTypeDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/doctypes/{docTypeId}',
      path: {
        docTypeId: docTypeId,
      },
    });
  }

  /**
   * Удалить тип
   * @param docTypeId ID типа
   * @returns void
   * @throws ApiError
   */
  public static deleteDocType(docTypeId: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v2/doctypes/{docTypeId}',
      path: {
        docTypeId: docTypeId,
      },
    });
  }

  /**
   * Изменить тип
   * @param docTypeId ID типа
   * @param requestBody
   * @returns DocTypeDto OK
   * @throws ApiError
   */
  public static updateDocType(
    docTypeId: number,
    requestBody: DocTypeUpdateRequestDto,
  ): CancelablePromise<DocTypeDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v2/doctypes/{docTypeId}',
      path: {
        docTypeId: docTypeId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Получить атрибут по ID
   * @param docAttributeId ID атрибута
   * @returns DocAttributeDto OK
   * @throws ApiError
   */
  public static getAttribute(
    docAttributeId: number,
  ): CancelablePromise<DocAttributeDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/docattributes/{docAttributeId}',
      path: {
        docAttributeId: docAttributeId,
      },
    });
  }

  /**
   * Удалить атрибут
   * @param docAttributeId ID атрибута
   * @returns void
   * @throws ApiError
   */
  public static deleteAttribute(
    docAttributeId: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v2/docattributes/{docAttributeId}',
      path: {
        docAttributeId: docAttributeId,
      },
    });
  }

  /**
   * Изменить атрибут
   * @param docAttributeId ID атрибута
   * @param requestBody
   * @returns DocAttributeDto OK
   * @throws ApiError
   */
  public static updateAttribute(
    docAttributeId: number,
    requestBody: DocAttributeUpdateRequestDto,
  ): CancelablePromise<DocAttributeDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v2/docattributes/{docAttributeId}',
      path: {
        docAttributeId: docAttributeId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Получить пользователя по номеру телефона
   * @param phone Телефон пользователя
   * @returns UserReplyDto OK
   * @throws ApiError
   */
  public static getUserByPhone(phone: string): CancelablePromise<UserReplyDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/users/phone/{phone}',
      path: {
        phone: phone,
      },
    });
  }

  /**
   * Получить пользователя по паспорту
   * @param passport Паспорт пользователя
   * @returns UserReplyDto OK
   * @throws ApiError
   */
  public static getUserByPassport(
    passport: string,
  ): CancelablePromise<UserReplyDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/users/passport/{passport}',
      path: {
        passport: passport,
      },
    });
  }

  /**
   * Получить всех пользователей с сортировкой и пагинацией
   * @param ids
   * @param page Zero-based page index (0..N)
   * @param size The size of the page to be returned
   * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @returns PageUserReplyDto OK
   * @throws ApiError
   */
  public static getUsers(
    ids?: Array<number>,
    page?: number,
    size: number = 20,
    sort?: Array<string>,
  ): CancelablePromise<PageUserReplyDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/users/ids',
      query: {
        ids: ids,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * Получить пользователя по eMail
   * @param email eMail пользователя
   * @returns UserReplyDto OK
   * @throws ApiError
   */
  public static getUserByEmail(email: string): CancelablePromise<UserReplyDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/users/email/{email}',
      path: {
        email: email,
      },
    });
  }

  /**
   * Получить кол-во пользователей
   * При запросе от ADMIN поиск будет проходить по всей базе, для остальных ролей поиск внутри своей компании
   * @returns CountUsersDto OK
   * @throws ApiError
   */
  public static countUsers(): CancelablePromise<CountUsersDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/statistic/users/count',
    });
  }

  /**
   * Получить рейтинг активных пользователей по организации.
   * При запросе от ADMIN по указанной компании, для остальных ролей поиск внутри своей компании
   * @param orgId ID организации
   * @returns UserRatingDto OK
   * @throws ApiError
   */
  public static getRating(
    orgId: number,
  ): CancelablePromise<Array<UserRatingDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/statistic/userRating/{orgId}',
      path: {
        orgId: orgId,
      },
    });
  }

  /**
   * Получить кол-во организаций
   * @returns CountOrgDto OK
   * @throws ApiError
   */
  public static countOrg(): CancelablePromise<CountOrgDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/statistic/organisation/count',
    });
  }

  /**
   * Получить список самых активных организаций
   * @returns OrgDto OK
   * @throws ApiError
   */
  public static getActiveOrganization(): CancelablePromise<Array<OrgDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/statistic/getActiveOrganization',
    });
  }

  /**
   * Получить общее кол-во документов.
   * при запросе от ADMIN поиск будет проходить по всей базе, для остальных ролей поиск внутри своей компании
   * @returns DocStatisticDTO OK
   * @throws ApiError
   */
  public static getCount(): CancelablePromise<DocStatisticDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/statistic/documents/getCount',
    });
  }

  /**
   * Получить кол-во документов со статусом
   * При запросе от ADMIN поиск будет проходить по всей базе, для остальных ролей поиск внутри своей компании
   * @param status Наименование статуса
   * @returns DocStatisticDTO OK
   * @throws ApiError
   */
  public static getCountByStatus(
    status: string,
  ): CancelablePromise<DocStatisticDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/statistic/documents/getCountByStatus/{status}',
      path: {
        status: status,
      },
    });
  }

  /**
   * Получить всех пользователей по организации
   * @param orgId Id организации
   * @returns UserReplyDto OK
   * @throws ApiError
   */
  public static getUsersByOrganization(
    orgId: number,
  ): CancelablePromise<Array<UserReplyDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/org/{orgId}/users',
      path: {
        orgId: orgId,
      },
    });
  }

  /**
   * Получить все типы по организации
   * @param orgId Id организации
   * @returns DocTypeDto OK
   * @throws ApiError
   */
  public static getDocTypesByOrganization(
    orgId: number,
  ): CancelablePromise<Array<DocTypeDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/org/{orgId}/doctypes',
      path: {
        orgId: orgId,
      },
    });
  }

  /**
   * Получить все атрибуты по организации
   * @param orgId Id организации
   * @returns DocAttributeDto OK
   * @throws ApiError
   */
  public static getAttributesByOrganization(
    orgId: number,
  ): CancelablePromise<Array<DocAttributeDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/org/{orgId}/docattributes',
      path: {
        orgId: orgId,
      },
    });
  }

  /**
   * Поиск организации по подстроке в имени
   * @param name Подстрока в имени
   * @returns OrgDto OK
   * @throws ApiError
   */
  public static getOrgsByNameLike(
    name: string,
  ): CancelablePromise<Array<OrgDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/org/name/{name}',
      path: {
        name: name,
      },
    });
  }

  /**
   * Получить всех пользователей по своей организации
   * @returns UserReplyDto OK
   * @throws ApiError
   */
  public static getUsersMyOrganization(): CancelablePromise<
    Array<UserReplyDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/org/my/users',
    });
  }

  /**
   * Получить все типы по своей организации
   * @returns DocTypeDto OK
   * @throws ApiError
   */
  public static getDocTypesMyOrganization(): CancelablePromise<
    Array<DocTypeDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/org/my/doctypes',
    });
  }

  /**
   * Получить все атрибуты по своей организации
   * @returns DocAttributeDto OK
   * @throws ApiError
   */
  public static getAttributesMyOrganization(): CancelablePromise<
    Array<DocAttributeDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/org/my/docattributes',
    });
  }

  /**
   * Посмотреть все процессы по документу
   * @param documentId ID документа
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static findProcessByDocumentId(
    documentId: number,
  ): CancelablePromise<Array<DocProcessDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/document/{documentId}/processes',
      path: {
        documentId: documentId,
      },
    });
  }

  /**
   * Получить историю изменений по ID
   * @param documentId ID документа
   * @param page Zero-based page index (0..N)
   * @param size The size of the page to be returned
   * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param orgId ID организации
   * @returns PageDocumentChangesDto OK
   * @throws ApiError
   */
  public static findDocChangesByDocumentId(
    documentId: number,
    page?: number,
    size: number = 20,
    sort?: Array<string>,
    orgId?: number,
  ): CancelablePromise<PageDocumentChangesDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/document/{documentId}/changes',
      path: {
        documentId: documentId,
      },
      query: {
        page: page,
        size: size,
        sort: sort,
        org_id: orgId,
      },
    });
  }

  /**
   * Получить процесс по ID
   * @param processId ID документа
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static findProcessById(
    processId: number,
  ): CancelablePromise<DocProcessDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/document/processes/{processId}',
      path: {
        processId: processId,
      },
    });
  }

  /**
   * Удалить процесс
   * @param processId ID процесса
   * @returns void
   * @throws ApiError
   */
  public static deleteProcess(processId: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v2/document/processes/{processId}',
      path: {
        processId: processId,
      },
    });
  }

  /**
   * Получить все процессы, где текущий пользователь является отправителем
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static findOutgoingProcesses(): CancelablePromise<
    Array<DocProcessDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/document/processes/outgoing',
    });
  }

  /**
   * Получить все процессы, где текущий пользователь является получателем
   * @returns DocProcessDto OK
   * @throws ApiError
   */
  public static findIncomingProcesses(): CancelablePromise<
    Array<DocProcessDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/document/processes/incoming',
    });
  }

  /**
   * Получить изменения документа по ID
   * @param documentChangesId ID изменения документа
   * @returns DocumentChangesDto OK
   * @throws ApiError
   */
  public static findDocChangesById(
    documentChangesId: number,
  ): CancelablePromise<DocumentChangesDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/document/changesById/{documentChangesId}',
      path: {
        documentChangesId: documentChangesId,
      },
    });
  }

  /**
   * Получить документы измененные пользователем
   * @param creatorId ID создателя документа
   * @returns DocumentChangesDto OK
   * @throws ApiError
   */
  public static findDocChangesByUserId(
    creatorId: number,
  ): CancelablePromise<Array<DocumentChangesDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/document/changesByCreator/{creatorId}',
      path: {
        creatorId: creatorId,
      },
    });
  }

  /**
   * Поиск типа по подстроке в имени
   * @param name Подстрока имени
   * @returns DocTypeDto OK
   * @throws ApiError
   */
  public static getDocTypesByNameLike(
    name: string,
  ): CancelablePromise<Array<DocTypeDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/doctypes/name/{name}',
      path: {
        name: name,
      },
    });
  }

  /**
   * Поиск атрибута по подстроке в имени.
   * при запросе от ADMIN поиск будет проходить по всей базе, для остальных ролей поиск атрибутов проходит внутри своей организации
   * @param name Подстрока имени
   * @returns DocAttributeDto OK
   * @throws ApiError
   */
  public static getDocAttributesByNameLike(
    name: string,
  ): CancelablePromise<Array<DocAttributeDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/docattributes/name/{name}',
      path: {
        name: name,
      },
    });
  }

  /**
   * Получить информацию о пользователе по токену авторизации
   * @returns UserReplyDto OK
   * @throws ApiError
   */
  public static getUserInfo(): CancelablePromise<UserReplyDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v2/auth/info',
    });
  }
}
