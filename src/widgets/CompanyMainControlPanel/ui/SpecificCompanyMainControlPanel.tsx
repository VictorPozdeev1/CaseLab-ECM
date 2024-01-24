import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useCompaniesStore } from '@entities/company/model';
import { BaseCompanyMainControlPanel } from './BaseCompanyMainControlPanel';
import { useParams } from 'react-router-dom';

export const SpecificCompanyMainControlPanel: FC = observer(() => {
  const companiesStore = useCompaniesStore();
  const { companyId } = useParams();
  const companyName = companiesStore.getNameById(+(companyId as string));

  const title =
    companyName !== undefined
      ? `Организация: ${companyName ?? 'id=' + companyId}`
      : 'Выберите организацию';

  return <BaseCompanyMainControlPanel title={title} />;
});
