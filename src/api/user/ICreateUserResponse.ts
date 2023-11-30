export default interface ICreateUserResponse {
  id: number;
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  userPassportDto: {
    passportSeries: string;
    passportNumber: string;
    passportIssued: string;
    passportDate: string;
    passportKp: string;
  };
  orgDto: {
    id: number;
    name: string;
    inn: string;
  };
  post: string;
  role: string;
}
