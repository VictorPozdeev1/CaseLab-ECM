import React, { type FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '@pages/LoginPage/LoginPage';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* При переходе на / надо проверять, залогинен юзер или нет, и исходя из его роли редиректить его на его домашнюю страницу.
      Видимо, надо посмотреть такие вещи из реакт-роутинга как <Navigate/>, 'loaders', 'redirect action' */}
      {/* <Route path="/" element={<Layout />}> */}
      {/* {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />} */}
      <Route
        path="*"
        element={
          <h1> page not found. Only the page /login is presented by now.</h1>
        }
      />
    </Routes>
  );
};

export default AppRouter;
