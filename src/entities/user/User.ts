import { type UserReplyDto } from '@api';

export class User {
  /* eslint-disable  @typescript-eslint/no-non-null-assertion */
  constructor(apiResponse: UserReplyDto) {
    this.id = apiResponse.id!;
    const fullName = parseFullName(apiResponse.fullName!);
    this.firstName = fullName.firstName;
    this.lastName = fullName.lastName;
    this.patronymic = fullName.patronymic;
    this.dateOfBirth = apiResponse.dateOfBirth!;
    this.email = apiResponse.email!;
    this.phone = apiResponse.phone!;
    this.organizationId = apiResponse.orgDto!.id!;
    this.role = apiResponse.role!;
    this.post = apiResponse.post!;
  }

  /* eslint-enable @typescript-eslint/no-non-null-assertion */

  id: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  dateOfBirth: string;
  email: string;
  phone: string;

  // passportSeries?: string;
  // passportNumber?: string;
  // passportIssued?: string;
  // passportDate?: string;
  // passportKp?: string;

  // organizationName: string;

  organizationId: number;
  role: string;
  post: string;

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

// Вероятно, то, что ниже, после релиза 2.0 будет удалено
/* eslint-disable */
import { CurrentUserData } from '@api/models/UserLoginResponseDto';
import { parse } from 'path';
type FullName = Pick<CurrentUserData, 'firstName' | 'lastName' | 'patronymic'>;
const parseFullName = (fullName: string): FullName => {
  return fullName.split(' ').reduce(
    (acc, cur, idx) => {
      switch (idx) {
        case 0:
          acc.firstName = cur;
          break;
        case 1:
          acc.lastName = cur;
          break;
        case 2:
          acc.patronymic = cur;
          break;
      }
      return { ...acc };
    },
    { firstName: '', lastName: '', patronymic: '' } satisfies FullName,
  );
};
