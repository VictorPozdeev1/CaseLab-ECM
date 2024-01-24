import { useEffect, type FC } from 'react';

import { MyCompanyUsersControlPanel } from '@widgets/CompanyUsersControlPanel';
import { observer } from 'mobx-react';
import { useCompaniesStore } from '@entities/company/model';

export const MyCompanyUsersControlPanelPage: FC = observer(() => {
  const companiesStore = useCompaniesStore();
  useEffect(() => {
    if (companiesStore.isEmpty) {
      void companiesStore.loadCompanies();
    }
  }, []);
  return <MyCompanyUsersControlPanel />;
});
