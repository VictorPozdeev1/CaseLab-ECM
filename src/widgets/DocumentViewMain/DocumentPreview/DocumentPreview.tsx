import { type FC } from 'react';
import Box from '@mui/material/Box';
import DocViewer, {
  type IDocument as DocViewerDocument,
} from '@cyntler/react-doc-viewer';

import { observer } from 'mobx-react-lite';
interface DocumentPreviewProps {
  documentLink?: string;
}
export const DocumentPreview: FC<DocumentPreviewProps> = observer(
  ({ documentLink }) => {
    const docs: DocViewerDocument[] = [
      // заглушка пока не будет нормальной ссылки на документ
      {
        uri: 'https://pdfobject.com/pdf/sample.pdf',
      },
      { uri: documentLink ?? '' },
    ];
    return (
      <Box>
        {documentLink !== undefined ? (
          <DocViewer
            documents={docs}
            prefetchMethod="GET"
            config={{
              header: {
                disableHeader: true,
                disableFileName: true,
                retainURLParams: false,
              },
            }}
          />
        ) : (
          'не удалось загрузить документ'
        )}
      </Box>
    );
  },
);
