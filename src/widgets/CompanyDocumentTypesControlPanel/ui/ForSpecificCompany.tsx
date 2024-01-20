import { type FC } from 'react';
import { observer } from 'mobx-react-lite';

import { getCompaniesStore } from '@entities/company/model';
import { Base } from './Base';

export const ForSpecificCompany: FC<{ companyId: number }> = observer(
  ({ companyId }) => {
    const companyName = getCompaniesStore().getNameById(companyId);

    return <Base title={`Организация: ${companyName ?? 'id=' + companyId}`} />;
  },
);
