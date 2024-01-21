import { type FC } from 'react';
import { SpecificCompanyMainControlPanel } from '@widgets/CompanyMainControlPanel';
import { useParams } from 'react-router-dom';

export const SpecificCompanyMainControlPanelPage: FC = () => {
  const { companyId: companyIdString } = useParams();
  const companyId = Number(companyIdString);
  if (Number.isNaN(companyId))
    return <div>Не существует организации с id = {companyIdString}</div>;
  return <SpecificCompanyMainControlPanel />;
};
