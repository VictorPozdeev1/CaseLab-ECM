import React, { type FC } from 'react';
import Container from '@mui/material/Container';
import { DocumentHeader } from './DocumentHeader/DocumentHeader';
import { DocumentNav } from './DocumentNav/DocumentNav';
import { DocumentSendToReview } from './DocumentSendToReview/DocumentSendToReview';
import { DocumentPreview } from './DocumentPreview/DocumentPreview';

export const DocumentViewMain: FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        width: '100%',
        padding: 'var(--paddings-pad4, 32px) var(--paddings-pad3, 24px)',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        gap: 'var(--paddings-pad4, 32px)',
        flex: '1 0 0',
        borderRadius: 'var(--none, 0px)',
      }}
    >
      <DocumentNav></DocumentNav>
      <DocumentHeader></DocumentHeader>
      <DocumentSendToReview></DocumentSendToReview>
      <DocumentPreview></DocumentPreview>
    </Container>
  );
};
