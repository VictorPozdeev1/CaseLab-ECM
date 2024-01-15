import { request as baseRequest } from './core/request';
import type { ApiRequestOptions } from './core/ApiRequestOptions';
import { CancelablePromise } from './core/CancelablePromise';
import type { OpenAPIConfig } from './core/OpenAPI';
import { errorStore } from '@shared/appError';
import { type ApiError } from './core/ApiError';

/* Может быть, всё-таки стоит сделать этот декоратор по-хорошему
 * Например, чтобы он декорировал класс Service и обёртывал все его методы.
 * Или через аксиос интерсептор. Но это надо тогда менять на аксиос в настройках...
 */

export const RequestDecorator = <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions,
): CancelablePromise<T> => {
  return new CancelablePromise<T>((resolve, reject, onCancel) => {
    baseRequest(config, options)
      .then((response) => {
        resolve(response as T);
      })
      .catch((error: ApiError) => {
        if (
          error.status === 401 &&
          error.body.message !== 'Неверные учетные данные пользователя'
        ) {
          errorStore.setError(
            'Похоже, вы не залогинены. Перейти на страницу логина?',
          );
        } else {
          reject(error);
        }
      });
    return () => {};
  });
};
