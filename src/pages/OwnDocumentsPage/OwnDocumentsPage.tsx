import { useEffect, type FC } from 'react';
import { observer } from 'mobx-react-lite';

import { Box, Typography } from '@mui/material';

import { documentsStore } from '@store/index';
import { CreateDocumentWidget } from '@widgets/CreateDocumentWidget';
import { OwnDocumentsTable } from '@widgets/OwnDocumentsTable';

export const OwnDocumentsPage: FC = observer(() => {
  useEffect(() => {
    void documentsStore.getDocuments();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: 'var(--paddings-pad-2, 16px) var(--none, 0px)',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}
      >
        <Typography variant="h4">Мои документы</Typography>
        <CreateDocumentWidget />
      </Box>
      <Box style={{ alignSelf: 'stretch' }}>
        <OwnDocumentsTable documents={documentsStore.ownDocuments} />
      </Box>
    </>
  );
});
