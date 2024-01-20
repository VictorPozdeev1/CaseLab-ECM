import { type FC } from 'react';
import { Navigate } from 'react-router';

import { currentSessionStore } from '@entities/session';
import { Roles } from '@entities/user';

const defaultPagesByRole = {
  [Roles.USER]: '/myDocuments',
  [Roles.COMPANY_ADMIN]: '/myCompany',
  [Roles.ADMIN]: '/companies',
};

export const HomePage: FC = () => {
  const redirectTo =
    defaultPagesByRole[currentSessionStore.currentUserData.role as Roles];
  return <Navigate to={redirectTo} replace={true} />;
};
