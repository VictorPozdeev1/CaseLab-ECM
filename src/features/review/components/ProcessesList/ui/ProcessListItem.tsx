import {
  DocumentStatusChip,
  type DocumentStatusUnion,
} from '@entities/document';
import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { type FC } from 'react';

export interface ProcessListItemProps {
  reviewer: string;
  company?: string;
  status: DocumentStatusUnion;
  comment: string;
}

export const ProcessListItem: FC<ProcessListItemProps> = ({
  reviewer,
  company,
  status,
  comment,
}) => {
  return (
    <Card sx={{ minWidth: 350 }}>
      <CardContent>
        <Box display={'flex'} justifyContent={'space-between'}>
          {/* <Typography component={'span'}>Проверяющий(ая): </Typography> */}
          <Typography fontWeight={600} fontSize={24} component={'span'}>
            {reviewer}
          </Typography>
          <DocumentStatusChip variant="text" status={status} />
        </Box>
        <Box mb={2}>
          <Typography fontWeight={600} component={'span'}>
            Организация:{' '}
          </Typography>
          <Typography component={'span'}>{company}</Typography>
        </Box>
        <Box>
          <Typography fontWeight={600} component={'p'}>
            Комметарий:{' '}
          </Typography>
          <Typography component={'p'}>{comment}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
