import React, { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@components/UI/Layout/Layout";
import { LoginPage } from "@pages/LoginPage/LoginPage";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
