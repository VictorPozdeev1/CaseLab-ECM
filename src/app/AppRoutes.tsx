import type { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@processes/RequireAuth/RequireAuth';
import { RequireRoleCheck } from '@processes/RequireRoleCheck/RequireRoleCheck';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { Header } from '@widgets/Header/Header';
import { HomePage } from '@pages/HomePage/HomePage';
import { Page1 } from '@pages/Page1/Page1';
import { AdminPage } from '@pages/AdminPage/AdminPage';
import { ForbiddenPage } from '@pages/ForbiddenPage/ForbiddenPage';
import { OwnDocumentsPage } from '@pages/OwnDocumentsPage/OwnDocumentsPage';
import { UsersPage } from '@pages/UsersPage';
import { Page404 } from '@pages/Page404';

// Роут users надо будет сделать вложенным

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <>
              <Header />
              <Outlet />
            </>
          </RequireAuth>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="myDocuments" element={<OwnDocumentsPage />} />
        <Route
          path="page1"
          element={
            <RequireRoleCheck role="USER">
              <Page1 />
            </RequireRoleCheck>
          }
        />

        <Route
          path="systemadmin"
          element={
            <RequireRoleCheck role="SYSTEM_ADMIN">
              <AdminPage />
            </RequireRoleCheck>
          }
        />
      </Route>
      <Route path="forbidden" element={<ForbiddenPage />} />
      <Route path="*" element={<Page404 />} />
      <Route path="users" element={<UsersPage />} />
    </Routes>
  );
};

export default AppRoutes;
