import { Chip } from '@mui/material';
import { type FC } from 'react';

interface StatusChipProps {
  status: 'created' | 'adopted' | 'rejected';
}

export const StatusChip: FC<StatusChipProps> = ({ status }): JSX.Element => {
  return (
    <>
      {status === 'created' && (
        <Chip label="Создан" size="medium" color="default" variant="filled" />
      )}
    </>
  );
};
