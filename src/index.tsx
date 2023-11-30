import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@app/App';

import './index.css';

/* eslint-disable */
import { createUser } from '@api/user/userApi';
import { currentUser } from '@store/store';
const createdUserPromise = createUser(
  {
    id: 0,
    lastName: '111',
    firstName: '111',
    patronymic: '111',
    dateOfBirth: '12.12.1212',
    email: '111@greenatom.ru',
    phone: '12345678901',
    passportSeries: 'stri',
    passportNumber: 'string',
    passportIssued: 'string',
    passportDate: '12.12.1212',
    passportKp: '123123',
    organizationId: 1,
    post: 'My first user',
    role: 'USER',
  },
  localStorage.getItem('token') as string,
);
/* eslint-enable */

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
