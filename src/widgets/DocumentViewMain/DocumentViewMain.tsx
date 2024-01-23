import React, { type FC } from 'react';
import { DocumentHeader } from './DocumentHeader/DocumentHeader';
import { DocumentNav } from './DocumentNav/DocumentNav';
import { SendToReviewForm } from '@features/review/components/SendToReviewForm/SendToReviewForm';
// import { DocumentPreview } from './DocumentPreview/DocumentPreview';
import { Box } from '@mui/material';
import { ProcessesList } from '@features/review/components/ProcessesList/ProcessesList';

export const DocumentViewMain: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        gap: 4,
      }}
    >
      <DocumentNav />
      <DocumentHeader />
      <SendToReviewForm />
      <ProcessesList />
      {/* <DocumentPreview /> */}
    </Box>
  );
};
