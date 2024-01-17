import { type FC } from 'react';
import { observer } from 'mobx-react-lite';

import { getCompaniesStore } from '@entities/company/model';
import { BaseCompanyMainControlPanel } from './BaseCompanyMainControlPanel';

export const SpecificCompanyMainControlPanel: FC<{ companyId: number }> =
  observer(({ companyId }) => {
    const companyName = getCompaniesStore().getNameById(companyId);

    return (
      <BaseCompanyMainControlPanel
        title={`Организация: ${companyName ?? 'id=' + companyId}`}
      />
    );
  });
