import { type UserReplyDto } from '@api';

export class User {
  constructor(apiResponse: UserReplyDto) {
    this.id = apiResponse.id;
    this.firstName = apiResponse.firstName;
    this.lastName = apiResponse.lastName;
    this.patronymic = apiResponse.patronymic;
    this.dateOfBirth = apiResponse.dateOfBirth;
    this.email = apiResponse.email;
    this.phone = apiResponse.phone;
    this.organizationId = apiResponse.organization.id;
    this.role = apiResponse.role;
    this.post = apiResponse.post;
  }

  id: number;
  lastName: string;
  firstName: string;
  patronymic?: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  organizationId: number;
  role: string;
  post: string;

  get initials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  }

  get shortName(): string {
    return `${this.lastName} ${this.firstName[0]}.${
      typeof this.patronymic === 'string' && this.patronymic.length > 0
        ? ' ' + this.patronymic[0] + '.'
        : ''
    }`;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName} ${this.patronymic}`;
  }
}
