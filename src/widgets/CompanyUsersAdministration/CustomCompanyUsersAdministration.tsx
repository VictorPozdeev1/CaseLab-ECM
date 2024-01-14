import { useEffect, type FC, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { companiesStore } from '@entities/company/model';
import userStores, { type CompanyUsersModel } from './model';
import { CompanyUsersAdministration } from './CompanyUsersAdministration';

export const CustomCompanyUsersAdministration: FC<{ companyId: number }> =
  observer(({ companyId }) => {
    const [model, setModel] = useState<CompanyUsersModel>(
      userStores.getCustomCompanyUsersStore(companyId),
    );

    // Может быть, это и не нужно?
    useEffect(() => {
      const model = userStores.getCustomCompanyUsersStore(companyId);
      setModel(model);
    }, [companyId]);

    const companyName = companiesStore.getNameById(companyId);

    return (
      <CompanyUsersAdministration
        title={`Список сотрудников организации: ${
          companyName ?? 'id=' + companyId
        }`}
        model={model}
      />
    );
  });
