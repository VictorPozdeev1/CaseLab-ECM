import { type FC } from 'react';
import DocViewer, {
  type IDocument as DocViewerDocument,
} from '@cyntler/react-doc-viewer';

import { observer } from 'mobx-react-lite';
import { documentViewPageStore } from '@pages/DocumentViewPage/store';
import { getDocumentDownloadLink } from '@entities/document/lib/downloadDocumentFile';

export const DocumentPreview: FC = observer(() => {
  const document = documentViewPageStore.document;
  /// Генерация ссылки на скачивание. Как появится в апи-убрать
  const documentLink = getDocumentDownloadLink(
    document?.documentLink as string,
    document?.name as string,
  ).toString();

  const docs: DocViewerDocument[] = [
    // заглушка пока не будет нормальной ссылки на документ
    {
      uri: 'https://pdfobject.com/pdf/sample.pdf',
    },
    { uri: documentLink ?? '' },
  ];
  return (
    <>
      {documentLink !== undefined ? (
        <DocViewer
          documents={docs}
          // prefetchMethod="GET"
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
    </>
  );
});
