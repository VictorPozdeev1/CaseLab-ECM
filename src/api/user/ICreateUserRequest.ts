export default interface ICreateUserRequest {
  id: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  passportSeries: string;
  passportNumber: string;
  passportIssued: string;
  passportDate: string;
  passportKp: string;
  organizationId: number;
  post: string;
  role: string;
}
