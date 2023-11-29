/* eslint-disable */
import { type FC } from 'react';
import CaselabEcmApi from '@api/CaselabEcmApi';
import AppRouter from './AppRouter';

const { loginService, getUsersCount, getAllUsers, getAllOrganization } =
  CaselabEcmApi;

const App: FC = () => {
  loginService('admin@mail.ru', '251323Nn').then((token) => {
    console.log(token);
    getUsersCount(token as string).then((data) => console.log(data));
    getAllUsers(token as string).then((data) => console.log(data));
    getAllOrganization(token as string).then((data) => console.log(data));
  });

  return <AppRouter />;
};

export default App;
