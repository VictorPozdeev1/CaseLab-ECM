import { type FC } from 'react';

import { SpecificCompanyUsersControlPanel } from '@widgets/CompanyUsersControlPanel';
import { useParams } from 'react-router-dom';

export const SpecificCompanyUsersControlPanelPage: FC = () => {
  const { companyId: companyIdString } = useParams();
  const companyId = Number(companyIdString);
  if (Number.isNaN(companyId))
    return <div>Не существует организации с id = {companyIdString}</div>;
  return <SpecificCompanyUsersControlPanel companyId={companyId} />;
};
