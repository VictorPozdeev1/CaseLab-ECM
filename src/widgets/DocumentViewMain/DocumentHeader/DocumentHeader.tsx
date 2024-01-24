import { type FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import session from '@entities/session/session';
import { documentViewPageStore } from '@pages/DocumentViewPage/store';

export const DocumentHeader: FC = observer(() => {
  const document = documentViewPageStore.document;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography variant="h4">{document?.name}</Typography>
        <Typography variant="subtitle2">
          Создан {document?.date.toLocaleDateString()} •{' '}
          {session.currentUserData.shortName}
        </Typography>
      </Box>
      <Button variant="outlined" startIcon={<CreateIcon />} onClick={() => {}}>
        РЕДАКТИРОВАТЬ
      </Button>
    </Box>
  );
});
