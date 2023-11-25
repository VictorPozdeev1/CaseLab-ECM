import React, { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./UI/Layout/Layout";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { AdminPage } from "../pages/AdminPage/AdminPage";
import { RequireAuth } from "./RequireAuth/RequireAuth";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
        {/* <Route path="/" element={<AdminPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRouter;
