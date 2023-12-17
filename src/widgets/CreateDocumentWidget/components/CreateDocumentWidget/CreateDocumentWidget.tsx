import { useState, type FC } from 'react';

// import { currentUserStore } from '@store/index';
import { CreateDocumentButton } from '../CreateDocumentButton/CreateDocumentButton';
import { CreateDocumentDialogForm } from '../CreateDocumentDialogForm/CreateDocumentDialogForm';
import { documentsStore } from '@store/index';
import { observer } from 'mobx-react-lite';

export const CreateDocumentWidget: FC = observer(() => {
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  if (isMinimized)
    return (
      <CreateDocumentButton
        onClick={() => {
          setIsMinimized(false);
        }}
      />
    );
  return (
    <CreateDocumentDialogForm
      onCancel={() => {
        setIsMinimized(true);
      }}
      onSubmit={(docTypeId, attributeValues) => {
        void documentsStore.createDocument(docTypeId, attributeValues);
        setIsMinimized(true); // После ответа от сервера
      }}
    />
  );
});
