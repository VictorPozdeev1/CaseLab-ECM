/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */
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
import type { UserCreateDto } from '../models/UserCreateDto';
import type { UserCredentialsDto } from '../models/UserCredentialsDto';
import type { UserRatingDto } from '../models/UserRatingDto';
import type { UserReplyDto } from '../models/UserReplyDto';
import type { UserUpdateDto } from '../models/UserUpdateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

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
      url: '/v1/doctypes/{docTypeId}/attributes/{docAttributeId}',
      path: {
        docTypeId: docTypeId,
        docAttributeId: docAttributeId,
      },
    });
  }

  /**
   * Получить все организации
   * @returns OrgDto OK
   * @throws ApiError
   */
  public static getAllOrgs(): CancelablePromise<Array<OrgDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/org',
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
      url: '/v1/org',
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
      url: '/v1/document/{documentId}/recipient/{recipientId}/new-process',
      path: {
        documentId: documentId,
        recipientId: recipientId,
      },
    });
  }

  /**
   * Получить все типы
   * Все типы с пагинацией и сортировкой
   * @param page Номер страницы
   * @param sortBy Сортировка
   * @returns DocTypeDto OK
   * @throws ApiError
   */
  public static getAllDocTypes(
    page?: number,
    sortBy?: string,
  ): CancelablePromise<Array<DocTypeDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/doctypes',
      query: {
        page: page,
        sortBy: sortBy,
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
      url: '/v1/doctypes',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Получить все атрибуты
   * Все атрибуты с пагинацией и сортировкой
   * @param page Номер страницы
   * @param sortBy Сортировка
   * @param token токен
   * @returns DocAttributeDto OK
   * @throws ApiError
   */
  public static getAllDocTypes1(
    token: string,
    page?: number,
    sortBy?: string,
  ): CancelablePromise<Array<DocAttributeDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/docattributes',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: '*/*',
        credentials: 'include',
      },
      query: {
        page: page,
        sortBy: sortBy,
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
      url: '/v1/docattributes',
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
   * @param from Номер страницы
   * @param size Количество элементов на странице
   * @param typeId ID типа документа
   * @param attributeId ID атрибута документа
   * @param attributeValue Значение атрибута
   * @returns DocumentDto OK
   * @throws ApiError
   */
  public static findDocuments(
    text?: string,
    rangeStart?: string,
    rangeEnd?: string,
    creatorId?: number,
    from?: number,
    size: number = 10,
    typeId?: number,
    attributeId?: number,
    attributeValue?: string,
  ): CancelablePromise<Array<DocumentDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/document',
      query: {
        text: text,
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
        creatorId: creatorId,
        from: from,
        size: size,
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
      url: '/document',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Авторизация
   * @param requestBody
   * @returns any Accepted
   * @throws ApiError
   */
  public static login(
    requestBody: UserCredentialsDto,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Получить всех пользователей
   * @returns UserReplyDto OK
   * @throws ApiError
   */
  public static getAllUsers(): CancelablePromise<Array<UserReplyDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/users',
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
      url: '/admin/users',
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
      url: '/v1/org/{orgId}',
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
      url: '/v1/org/{orgId}',
      path: {
        orgId: orgId,
      },
    });
  }

  /**
   * Изменить организацию
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
      url: '/v1/org/{orgId}',
      path: {
        orgId: orgId,
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
      url: '/v1/document/processes/{processId}/send-to-correction',
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
      url: '/v1/document/processes/{processId}/send-to-approve',
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
      url: '/v1/document/processes/{processId}/reject',
      path: {
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
      url: '/v1/document/processes/{processId}/approve',
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
      url: '/v1/doctypes/{docTypeId}',
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
      url: '/v1/doctypes/{docTypeId}',
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
      url: '/v1/doctypes/{docTypeId}',
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
      url: '/v1/docattributes/{docAttributeId}',
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
      url: '/v1/docattributes/{docAttributeId}',
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
      url: '/v1/docattributes/{docAttributeId}',
      path: {
        docAttributeId: docAttributeId,
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
      url: '/document/{documentId}',
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
      url: '/document/{documentId}',
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
      url: '/document/{documentId}',
      path: {
        documentId: documentId,
      },
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
      url: '/admin/users/{userId}',
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
      url: '/admin/users/{userId}',
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
      url: '/admin/users/{userId}',
      path: {
        userId: userId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Установить пароль для пользователя
   * @param password Пароль пользователя
   * @param userId ID пользователя
   * @returns any OK
   * @throws ApiError
   */
  public static setUserPassword(
    password: string,
    userId: number,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/admin/users/password/{userId}',
      path: {
        userId: userId,
      },
      query: {
        password: password,
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
      url: '/v1/org/name/{name}',
      path: {
        name: name,
      },
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
      url: '/v1/document/{documentId}/processes',
      path: {
        documentId: documentId,
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
      url: '/v1/document/processes/{processId}',
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
      url: '/v1/document/processes/{processId}',
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
      url: '/v1/document/processes/outgoing',
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
      url: '/v1/document/processes/incoming',
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
      url: '/v1/doctypes/name/{name}',
      path: {
        name: name,
      },
    });
  }

  /**
   * Поиск атрибута по подстроке в имени
   * @param name Подстрока имени
   * @returns DocAttributeDto OK
   * @throws ApiError
   */
  public static getDocAttributesByNameLike(
    name: string,
  ): CancelablePromise<Array<DocAttributeDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/docattributes/name/{name}',
      path: {
        name: name,
      },
    });
  }

  /**
   * Получить кол-во пользователей
   * @returns CountUsersDto OK
   * @throws ApiError
   */
  public static countUsers(): CancelablePromise<CountUsersDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/statistic/users/count',
    });
  }

  /**
   * Получить рейтинг активных пользователей по организации
   * @param orgId ID организации
   * @returns UserRatingDto OK
   * @throws ApiError
   */
  public static getRating(
    orgId: number,
  ): CancelablePromise<Array<UserRatingDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/statistic/userRating/{orgId}',
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
      url: '/statistic/organisation/count',
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
      url: '/statistic/getActiveOrganization',
    });
  }

  /**
   * Получить общее кол-во документов
   * @returns DocStatisticDTO OK
   * @throws ApiError
   */
  public static getCount(): CancelablePromise<DocStatisticDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/statistic/documents/getCount',
    });
  }

  /**
   * Получить кол-во документов со статусом
   * @param status Наименование статуса
   * @returns DocStatisticDTO OK
   * @throws ApiError
   */
  public static getCountByStatus(
    status: string,
  ): CancelablePromise<DocStatisticDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/statistic/documents/getCountByStatus/{status}',
      path: {
        status: status,
      },
    });
  }

  /**
   * Получить историю изменений по ID
   * @param documentId ID документа
   * @returns DocumentChangesDto OK
   * @throws ApiError
   */
  public static findDocChangesByDocumentId(
    documentId: number,
  ): CancelablePromise<Array<DocumentChangesDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/document/{documentId}/changes',
      path: {
        documentId: documentId,
      },
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
      url: '/document/changesById/{documentChangesId}',
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
      url: '/document/changesByCreator/{creatorId}',
      path: {
        creatorId: creatorId,
      },
    });
  }

  /**
   * Получить информацию о пользователе по токену авторизации
   * @returns any OK
   * @throws ApiError
   */
  public static getUserInfo(): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/info',
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
      url: '/admin/users/phone/{phone}',
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
      url: '/admin/users/passport/{passport}',
      path: {
        passport: passport,
      },
    });
  }

  /**
   * Получить всех пользователей с сортировкой и пагинацией
   * @param ids
   * @param sort Сортировка
   * @param from Номер страницы
   * @param size Количество элементов на странице
   * @returns UserReplyDto OK
   * @throws ApiError
   */
  public static getUsers(
    ids?: Array<number>,
    sort: string = '',
    from?: number,
    size: number = 10,
  ): CancelablePromise<Array<UserReplyDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/users/ids',
      query: {
        ids: ids,
        sort: sort,
        from: from,
        size: size,
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
      url: '/admin/users/email/{email}',
      path: {
        email: email,
      },
    });
  }
}
