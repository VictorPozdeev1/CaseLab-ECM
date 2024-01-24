import { useEffect, type FC, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useCompaniesStore } from '@entities/company/model';
import userStores, { type CompanyUsersModel } from '../model';
import { BaseCompanyUsersControlPanel } from './BaseCompanyUsersControlPanel';

export const SpecificCompanyUsersControlPanel: FC<{ companyId: number }> =
  observer(({ companyId }) => {
    const companiesStore = useCompaniesStore();

    const [model, setModel] = useState<CompanyUsersModel>(
      userStores.getCustomCompanyUserStore(companyId),
    );

    // Может быть, это и не нужно?
    useEffect(() => {
      const model = userStores.getCustomCompanyUserStore(companyId);
      if (companiesStore.companies === undefined) {
        void companiesStore.loadCompanies();
      }
      setModel(model);
    }, [companyId]);

    const companyName = companiesStore.getCompany(companyId)?.name;

    return (
      <BaseCompanyUsersControlPanel
        title={`Список сотрудников организации: ${
          companyName ?? 'id=' + companyId
        }`}
        model={model}
      />
    );
  });
