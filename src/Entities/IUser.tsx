export default interface IUser {
  id: number;
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  post: string;
  role: string;
  userPassportDto: {
    passportSeries: string;
    passportNumber: string;
    passportIssued: string;
    passportDate: string;
    passportKp: string;
  };
  orgDto: {
    id: 0;
    name: string;
    inn: string;
  };
}
