import React, { useEffect, type FC, useState } from 'react';
import { DocumentHeader } from './DocumentHeader/DocumentHeader';
import { DocumentNav } from './DocumentNav/DocumentNav';
import { DocumentSendToReview } from './DocumentSendToReview/DocumentSendToReview';
import { DocumentPreview } from './DocumentPreview/DocumentPreview';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useMatch } from 'react-router';
import { documentsStore } from '@store/index';
import { type Document as StoreDocument } from '@entities/document';
import { getDocumentDownloadLink } from '@entities/document/lib/downloadDocumentFile';

export const DocumentViewMain: FC = observer(() => {
  const match = useMatch('/myDocuments/:documentName');
  const [document, setDocument] = useState<StoreDocument>();

  useEffect(() => {
    void (async () => {
      if (documentsStore.documents === undefined) {
        await documentsStore.getDocuments();
      }
      setDocument(
        documentsStore.getDocumentByName(
          match?.params.documentName as string,
        ) as StoreDocument,
      );
    })();
  }, []);

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
      <DocumentHeader document={document} />
      <DocumentSendToReview />
      <DocumentPreview
        // генерирует ссылка на скачивание документа. Это костыль, как появится валмдная ссылка с бека - убрать
        documentLink={getDocumentDownloadLink(
          document?.documentPath as string,
          document?.name as string,
        ).toString()}
      />
    </Box>
  );
});
