import { useEffect, type FC } from 'react';
import { observer } from 'mobx-react-lite';

import { getCompaniesStore } from '@entities/company/model';
import { BaseCompanyMainControlPanel } from './BaseCompanyMainControlPanel';

export const SpecificCompanyMainControlPanel: FC<{ companyId: number }> =
  observer(({ companyId }) => {
    // пока зуглушка лучше сделать стор для одной страницы
    const companiesStore = getCompaniesStore();
    useEffect(() => {
      if (companiesStore.companies === undefined) {
        void companiesStore.loadCompanies();
      }
    }, []);

    const companyName = companiesStore.getById(companyId)?.name;

    return (
      <BaseCompanyMainControlPanel
        title={`Организация: ${companyName ?? 'id=' + companyId}`}
      />
    );
  });
