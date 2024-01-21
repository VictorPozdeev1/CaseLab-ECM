import React, { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { getCompaniesStore } from '@entities/company/model';
import { BaseCompanyMainControlPanel } from './BaseCompanyMainControlPanel';
import { useParams } from 'react-router-dom';

export const SpecificCompanyMainControlPanel: FC = observer(() => {
  const companiesStore = getCompaniesStore();
  const { companyId } = useParams();
  const companyName = companiesStore.getNameById(Number(companyId));

  const title =
    companyName !== undefined
      ? `Организация: ${companyName ?? 'id=' + companyId}`
      : 'Выберите организацию';

  return <BaseCompanyMainControlPanel title={title} />;
});
