import React, { type FC } from 'react';
import { DocumentHeader } from './DocumentHeader/DocumentHeader';
import { DocumentNav } from './DocumentNav/DocumentNav';
import { DocumentSendToReview } from './DocumentSendToReview/DocumentSendToReview';
import { DocumentPreview } from './DocumentPreview/DocumentPreview';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router';
import { documentsStore } from '@store/index';

export const DocumentViewMain: FC = observer(() => {
  const location = useLocation();
  // console.log(location);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        padding: 'var(--paddings-pad4, 32px) var(--paddings-pad3, 24px)',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        gap: 4,
      }}
    >
      <DocumentNav />
      <DocumentHeader
        document={documentsStore.getDocumentById(location.state?.documentId)}
      />
      <DocumentSendToReview></DocumentSendToReview>
      <DocumentPreview />
    </Box>
  );
});
