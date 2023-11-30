import $api from '@api/$api';
import type ICreateUserResponse from './ICreateUserResponse';
import type ICreateUserRequest from './ICreateUserRequest';

const createUser = async (
  user: ICreateUserRequest,
  token: string,
): Promise<ICreateUserResponse> =>
  (await $api(token).post<ICreateUserResponse>('admin/users', user)).data;

export { createUser };
