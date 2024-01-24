import { useEffect, type FC } from 'react';

import { MyCompanyMainControlPanel } from '@widgets/CompanyMainControlPanel';
import { observer } from 'mobx-react-lite';
import { useCompaniesStore } from '@entities/company/model';

export const MyCompanyMainControlPanelPage: FC = observer(() => {
  const companiesStore = useCompaniesStore();
  useEffect(() => {
    if (companiesStore.isEmpty) {
      void companiesStore.loadCompanies();
    }
  }, []);

  return <MyCompanyMainControlPanel />;
});
