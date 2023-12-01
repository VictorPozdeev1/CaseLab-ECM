import { type FC } from 'react';
import { documentsStore } from '@store/index';
import { OwnDocument } from '@components/OwnDocumentCard/OwnDocumentCard';
import { CreateDocumentWidget } from '@components/CreateDocumentWidget/CreateDocumentWidget';

export const OwnDocumentsPage: FC = () => {
  return (
    <>
      <div>
        Страница отображения документов пользователя (тех, которые он создал). В
        будущем нужно обернуть в проверку роли.
      </div>
      <main>
        <CreateDocumentWidget />
        {documentsStore.ownDocuments.map((d) => (
          <OwnDocument key={d.id} document={d}></OwnDocument>
        ))}
      </main>
    </>
  );
};
