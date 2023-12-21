import { type FC } from 'react';

import { CompanyUsersAdministration } from '@widgets/CompanyUsersAdministration/CompanyUsersAdministration';
import { useParams } from 'react-router-dom';

export const SpecificCompanyAdministrationPage: FC = () => {
  const { companyId: companyIdString } = useParams();
  const companyId = Number(companyIdString);
  if (Number.isNaN(companyId))
    return <div>Не существует организации с id = {companyIdString}</div>;
  return <CompanyUsersAdministration companyId={companyId} />;
};
