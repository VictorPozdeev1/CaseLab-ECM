import { type FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import userStores, { type CompanyUsersModel } from '../model';
import { BaseCompanyUsersControlPanel } from './BaseCompanyUsersControlPanel';

export const MyCompanyUsersControlPanel: FC = observer(() => {
  const model = useMemo<CompanyUsersModel>(
    () => userStores.myCompanyUsersStore,
    [],
  );

  return (
    <BaseCompanyUsersControlPanel
      title={`Список сотрудников моей организации`}
      model={model}
    />
  );
});
