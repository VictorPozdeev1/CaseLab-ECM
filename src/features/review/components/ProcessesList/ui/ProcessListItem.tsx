import {
  DocumentStatusChip,
  type DocumentStatusType,
} from '@entities/document';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { type MouseEventHandler, type FC } from 'react';

export interface ProcessListItemProps {
  reviewer?: string;
  company?: string;
  status: DocumentStatusType;
  comment: string;
  onCancel?: MouseEventHandler;
}

export const ProcessListItem: FC<ProcessListItemProps> = ({
  reviewer,
  company,
  status,
  comment,
  onCancel,
}) => {
  return (
    <Card sx={{ minWidth: 350 }}>
      <CardContent>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} flexDirection={'column'} mb={2}>
            {reviewer !== undefined ? (
              <>
                <Typography fontWeight={600} variant="h6" lineHeight={1}>
                  {reviewer}
                </Typography>
                <Typography variant="caption">{company}</Typography>
              </>
            ) : (
              <Typography fontWeight={600} variant="h6" lineHeight={1}>
                {company}
              </Typography>
            )}
          </Box>
          <DocumentStatusChip variant="text" status={status} />
        </Box>
        <Box>
          <Typography fontWeight={600} component={'p'}>
            Комметарий:{' '}
          </Typography>
          <Typography component={'p'} whiteSpace={'pre-line'}>
            {comment}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        <Button size="small" variant="text" color="error" onClick={onCancel}>
          отозвать
        </Button>
      </CardActions>
    </Card>
  );
};
