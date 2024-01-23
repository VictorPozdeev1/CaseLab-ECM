import type { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@processes/RequireAuth/RequireAuth';
import { RequirePermissionCheck } from '@processes/RequirePermissionCheck/RequirePermissionCheck';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { ForbiddenPage } from '@pages/ForbiddenPage/ForbiddenPage';
import { OwnDocumentsPage } from '@pages/OwnDocumentsPage/OwnDocumentsPage';
import { MyCompanyMainControlPanelPage } from '@pages/MyCompanyMainControlPanelPage';
import { MyCompanyUsersControlPanelPage } from '@pages/MyCompanyUsersControlPanelPage';
import { SpecificCompanyMainControlPanelPage } from '@pages/SpecificCompanyMainControlPanelPage';
import { SpecificCompanyUsersControlPanelPage } from '@pages/SpecificCompanyUsersControlPanelPage';
import { Page404 } from '@pages/Page404';
import { DocumentViewPage } from '@pages/DocumentViewPage/DocumentViewPage';
import { DocumentTypesPage } from '@pages/DocumentTypesPage/DocumentTypesPage';
import { ColumnLayout } from '@shared/layouts/ColumnLayout';
import { Permissions } from '@entities/session/session';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <ColumnLayout>
              <Outlet />
            </ColumnLayout>
          </RequireAuth>
        }
      >
        <Route index element={<HomePage />} />
        <Route
          path="myDocuments"
          element={
            <RequirePermissionCheck permission={Permissions.MY_DOCUMENTS}>
              <OwnDocumentsPage />
            </RequirePermissionCheck>
          }
        />
        <Route
          path="myDocuments/:documentName"
          element={<DocumentViewPage />}
        />
        <Route
          path="documentTypes"
          element={
            <RequirePermissionCheck permission={Permissions.DOCUMENT_TYPES}>
              <DocumentTypesPage />
            </RequirePermissionCheck>
          }
        />
        <Route
          path="myCompany"
          element={
            <RequirePermissionCheck
              permission={Permissions.MY_COMPANY_CONTROL_PANEL}
            >
              <MyCompanyMainControlPanelPage />
            </RequirePermissionCheck>
          }
        />
        <Route
          path="myCompany/employees"
          element={
            <RequirePermissionCheck
              permission={Permissions.MY_COMPANY_CONTROL_PANEL}
            >
              <MyCompanyUsersControlPanelPage />
            </RequirePermissionCheck>
          }
        />
        <Route
          path="companies"
          element={
            <RequirePermissionCheck
              permission={Permissions.SPECIFIC_COMPANY_CONTROL_PANEL}
            >
              <SpecificCompanyMainControlPanelPage />
            </RequirePermissionCheck>
          }
        />
        <Route
          path="companies/:companyId"
          element={
            <RequirePermissionCheck
              permission={Permissions.SPECIFIC_COMPANY_CONTROL_PANEL}
            >
              <SpecificCompanyMainControlPanelPage />
            </RequirePermissionCheck>
          }
        />
        <Route
          path="companies/:companyId/employees"
          element={
            <RequirePermissionCheck
              permission={Permissions.SPECIFIC_COMPANY_CONTROL_PANEL}
            >
              <SpecificCompanyUsersControlPanelPage />
            </RequirePermissionCheck>
          }
        />
        <Route path="forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
