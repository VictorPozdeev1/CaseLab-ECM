/* Этот файл был создан вручную, уже после того как основная масса сгенерирована автоматически (т.к. бэкенд теперь присылает UserDto в ответе) */

/* eslint-disable */
export type CurrentUserData = {
  id: number;
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId: number;
  patronymic: string;
  phone: string;
  post: string;
  role: string;
};

export type UserLoginResponseDto = {
  token: string;
  user: CurrentUserData;
};
