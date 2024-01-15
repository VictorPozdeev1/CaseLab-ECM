import { type FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import userStores, { type CompanyUsersModel } from './model';
import { CompanyUsersAdministration } from './CompanyUsersAdministration';

export const MyCompanyUsersAdministration: FC = observer(() => {
  const model = useMemo<CompanyUsersModel>(
    () => userStores.myCompanyUsersStore,
    [],
  );

  return (
    <CompanyUsersAdministration
      title={`Список сотрудников моей организации`}
      model={model}
    />
  );
});
