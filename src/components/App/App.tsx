import { FC } from "react";
import CaselabEcmApi from "../../data/api/CaselabEcmApi";
import "./App.css";
import AppRouter from "../AppRouter";

const { loginService, getUsersCount, getAllUsers, getAllOrganization } =
  CaselabEcmApi;

const App: FC = () => {
  // loginService("admin@mail.ru", "251323Nn").then((token) => {
  //   console.log(token);
  //   getUsersCount(token as string).then((data) => console.log(data));
  //   getAllUsers(token as string).then((data) => console.log(data));
  //   getAllOrganization(token as string).then((data) => console.log(data));
  // });

  return <AppRouter />;
=======
import React, { FC } from "react";
import "./App.css";

const App: FC = () => {
  return <div>New project</div>;
};

export default App;
