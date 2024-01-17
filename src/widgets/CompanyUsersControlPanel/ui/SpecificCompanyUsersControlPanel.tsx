import { useEffect, type FC, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { getCompaniesStore } from '@entities/company/model';
import userStores, { type CompanyUsersModel } from '../model';
import { BaseCompanyUsersControlPanel } from './BaseCompanyUsersControlPanel';

export const SpecificCompanyUsersControlPanel: FC<{ companyId: number }> =
  observer(({ companyId }) => {
    const [model, setModel] = useState<CompanyUsersModel>(
      userStores.getCustomCompanyUserStore(companyId),
    );

    // Может быть, это и не нужно?
    useEffect(() => {
      const model = userStores.getCustomCompanyUserStore(companyId);
      setModel(model);
    }, [companyId]);

    const companyName = getCompaniesStore().getNameById(companyId);

    return (
      <BaseCompanyUsersControlPanel
        title={`Список сотрудников организации: ${
          companyName ?? 'id=' + companyId
        }`}
        model={model}
      />
    );
  });
