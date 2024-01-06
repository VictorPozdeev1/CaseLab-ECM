import { type FC } from 'react';

import { CompanyUsersAdministration } from '@widgets/CompanyUsersAdministration/CompanyUsersAdministration';
import sessionStore from '@store/session';
import Spinner from '@shared/components/Spinner/Spinner';

export const MyCompanyAdministrationPage: FC = () => {
  const companyId = sessionStore.userData?.organization.id;
  if (typeof companyId !== 'number') return <Spinner />; // Или не принимать undefined?
  return <CompanyUsersAdministration companyId={companyId} />;
};
