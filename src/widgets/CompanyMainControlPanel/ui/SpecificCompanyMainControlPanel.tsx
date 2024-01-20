import React, { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CompanySidebar } from './CompanySidebar';
import { getCompaniesStore } from '@entities/company/model';
import { BaseCompanyMainControlPanel } from './BaseCompanyMainControlPanel';
import { Box } from '@mui/material';

export const SpecificCompanyMainControlPanel: FC<{ companyId: number }> =
  observer(({ companyId }) => {
    const companiesStore = getCompaniesStore();
    const companyName = companiesStore.getNameById(companyId);

    const title =
      companiesStore.getSelectedCompany() !== undefined
        ? `Организация: ${companyName ?? 'id=' + companyId}`
        : 'Выберите организацию';

    return (
      <BaseCompanyMainControlPanel title={title}>
        <Box sx={{ height: '100%' }}>
          <CompanySidebar />
        </Box>
      </BaseCompanyMainControlPanel>
    );
  });
