import { useEffect, type FC } from 'react';
import { observer } from 'mobx-react-lite';

import { Container, Box, Tabs, Tab } from '@mui/material';

import { documentsStore } from '@store/index';
import { CreateDocumentWidget } from '@widgets/CreateDocumentWidget';
import { OwnDocumentsTable } from '@widgets/OwnDocumentsTable';

export const OwnDocumentsPage: FC = observer(() => {
  useEffect(() => {
    void documentsStore.getDocuments();
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        maxWidth: 'var(--breakpoints-laptop, 992px)',
        padding: 'var(--paddings-pad-3, 24px) var(--none, 0px)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'var(--none, 0px)',
        alignSelf: 'stretch',
        borderRadius: 'var(--none, 0px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          padding: 'var(--paddings-pad-2, 16px) var(--none, 0px)',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          borderRadius: 'var(--none, 0px)',
          color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
          fontFeatureSettings: "'clig' off, 'liga' off",
          fontFamily: 'Roboto',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '133.4%',
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tabs>
            <Tab label="Мои документы" />
            <Tab label="Документы организации" />
            <Tab label="Процессы" />
          </Tabs>
        </Box>
        <CreateDocumentWidget />
      </Box>
      <Box style={{ alignSelf: 'stretch' }}>
        <OwnDocumentsTable documents={documentsStore.ownDocuments} />
      </Box>
    </Container>
  );
});
