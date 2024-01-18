import { type FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { type Document as StoreDocument } from '@entities/document';
import session from '@entities/session/session';
export interface DocumentHeaderProps {
  document?: StoreDocument;
}

export const DocumentHeader: FC<DocumentHeaderProps> = observer(
  ({ document }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // flex: '1 0 0',
            gap: 1,
          }}
        >
          <Typography variant="h6">{document?.name}</Typography>
          <Typography
            variant="subtitle1" // Выберите подходящий вариант подзаголовка
          >
            Создан {document?.date.toLocaleDateString()} •{' '}
            {session.currentUserData.shortName}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<CreateIcon />}
          onClick={() => {}}
        >
          РЕДАКТИРОВАТЬ
        </Button>
      </Box>
    );
  },
);
