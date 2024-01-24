import { useEffect, type FC } from 'react';
import { SpecificCompanyMainControlPanel } from '@widgets/CompanyMainControlPanel';
import { observer } from 'mobx-react-lite';
import { useCompaniesStore } from '@entities/company/model';

export const SpecificCompanyMainControlPanelPage: FC = observer(() => {
  const companiesStore = useCompaniesStore();
  useEffect(() => {
    if (companiesStore.isEmpty) {
      void companiesStore.loadCompanies();
    }
  }, []);
  return <SpecificCompanyMainControlPanel />;
});
