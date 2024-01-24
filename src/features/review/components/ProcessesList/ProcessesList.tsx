import { documentProcessesStore as processesStore } from '@entities/documentProcess';
import { Stack, Typography } from '@mui/material';

import { observer } from 'mobx-react-lite';
import React, { type FC } from 'react';
import { ProcessListItem } from './ui/ProcessListItem';
import { usersStore } from '@entities/user';
import { useCompaniesStore } from '@entities/company/model';

export const ProcessesList: FC = observer(() => {
  const companiesStore = useCompaniesStore();
  return (
    <Stack gap={1}>
      {processesStore?.processesList !== undefined ? (
        processesStore.processesList.map((el) => (
          <ProcessListItem
            key={el.id}
            reviewer={
              usersStore.companyUserById(el.recipient)?.shortName as string
            }
            company={
              companiesStore.getCompany(el.recipientOrganization)
                ?.name as string
            }
            status={el.status}
            comment={el.comment}
          ></ProcessListItem>
        ))
      ) : (
        <Typography>Нет процессов</Typography>
      )}
    </Stack>
  );
});
