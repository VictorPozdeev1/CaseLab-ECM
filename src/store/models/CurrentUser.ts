import { makeAutoObservable } from 'mobx';
import type { CurrentUserData } from '@api/models/UserLoginResponseDto';
import { type Organization } from './Organization';

export type CurrentUserArgs = Omit<CurrentUserData, 'organizationId'> & {
  organization?: Organization;
};
export class CurrentUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  dateOfBirth: string;
  role: string;
  phone: string;
  post: string;
  organization?: Organization;
  constructor({
    id,
    email,
    firstName,
    lastName,
    patronymic,
    dateOfBirth,
    role,
    phone,
    post,
    organization,
  }: CurrentUserArgs) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.patronymic = patronymic;
    this.dateOfBirth = dateOfBirth;
    this.role = role;
    this.phone = phone;
    this.post = post;
    this.organization = organization;
    makeAutoObservable(this);
  }

  get initials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  }

  get shortName(): string {
    return `${this.lastName} ${this.firstName[0]}. ${this.patronymic[0]}.`;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName} ${this.patronymic}`;
  }
}
