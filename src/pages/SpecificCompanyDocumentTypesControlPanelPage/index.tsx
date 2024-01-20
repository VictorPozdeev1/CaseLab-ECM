import { type FC } from 'react';

import { SpecificCompanyDocumentTypesControlPanel } from '@widgets/CompanyDocumentTypesControlPanel';
import { useParams } from 'react-router-dom';

export const SpecificCompanyDocumentTypesControlPanelPage: FC = () => {
  const { companyId: companyIdString } = useParams();
  const companyId = Number(companyIdString);
  if (Number.isNaN(companyId))
    return <div>Не существует организации с id = {companyIdString}</div>;
  return <SpecificCompanyDocumentTypesControlPanel companyId={companyId} />;
};
