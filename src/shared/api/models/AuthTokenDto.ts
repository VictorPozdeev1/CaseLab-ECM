/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { UserWithoutPassportDto } from './UserWithoutPassportDto';

/**
 * Токен авторизации и информация о пользователе
 */
export type AuthTokenDto = {
    /**
     * JWT токен доступа
     */
    token: string;
    user: UserWithoutPassportDto;
};
