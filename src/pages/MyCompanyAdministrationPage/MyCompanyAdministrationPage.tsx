import { type FC } from 'react';

import { CompanyUsersAdministration } from '@widgets/CompanyUsersAdministration/CompanyUsersAdministration';
import sessionStore from '@entities/session/session';

export const MyCompanyAdministrationPage: FC = () => {
  return (
    <CompanyUsersAdministration companyId={sessionStore.currentUserCompanyId} />
  );
};
