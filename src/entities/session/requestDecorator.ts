import { request as baseRequest } from '@api/core/request';
import type { ApiRequestOptions } from '@api/core/ApiRequestOptions';
import { CancelablePromise } from '@api/core/CancelablePromise';
import type { OpenAPIConfig } from '@api/core/OpenAPI';
import { errorStore } from '@store/index';

export const RequestDecorator = <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions,
): CancelablePromise<T> => {
  return new CancelablePromise<T>((resolve, reject, onCancel) => {
    baseRequest(config, options)
      .then((response) => {
        resolve(response as T);
      })
      .catch((error: any) => {
        if (error.status === 401) {
          errorStore.setError(
            'Похоже, вы не авторизованны. Перейти на страницу авторизации?',
          );
        } else {
          reject(error);
        }
      });
    return () => {};
  });
};
