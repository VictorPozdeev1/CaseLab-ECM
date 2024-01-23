import { Chip, type ChipOwnProps } from '@mui/material';
import { type FC } from 'react';
import {
  DocumentStatus,
  type DocumentStatusUnion,
  documentStatusMap,
} from '@entities/document/const/DocumentStatus';
import {
  Cancel,
  CheckCircle,
  Edit,
  ErrorOutline,
  WatchLater,
} from '@mui/icons-material';

export interface DocumentStatusChipProps {
  status: DocumentStatusUnion;
}

export const DocumentStatusChip: FC<DocumentStatusChipProps> = ({ status }) => {
  const chipMap: Record<DocumentStatusUnion, ChipOwnProps> = {
    [DocumentStatus.NEW]: {
      icon: <Edit />,
      color: 'default',
    },
    [DocumentStatus.WAITING_FOR_APPROVE]: {
      icon: <WatchLater />,
      color: 'info',
    },
    [DocumentStatus.APPROVED]: {
      icon: <CheckCircle />,
      color: 'success',
    },
    [DocumentStatus.REJECTED]: {
      icon: <Cancel />,
      color: 'error',
    },
    [DocumentStatus.CORRECTING]: {
      icon: <ErrorOutline />,
      color: 'warning',
    },
    [DocumentStatus.DELEGATED]: {
      icon: undefined,
      color: 'default',
    },
  };

  return (
    <Chip
      variant="filled"
      label={documentStatusMap[status]}
      icon={chipMap[status].icon}
      color={chipMap[status].color}
    />
  );
};
