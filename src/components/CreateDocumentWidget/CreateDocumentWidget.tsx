import { useState, type FC } from 'react';

// import { currentUserStore } from '@store/index';
import { CreateDocumentButton } from '@components/CreateDocumentButton/CreateDocumentButton';
import { CreateDocumentDialogForm } from '@components/CreateDocumentDialogForm/CreateDocumentDialogForm';
import { documentsStore } from '@store/index';
import { type DocAttributeValueCreateDto } from '@api/generated';
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
      onSubmit={(attributeValues) => {
        void documentsStore
          .createDocument(
            1,
            attributeValues as unknown as DocAttributeValueCreateDto[],
          )
          .then(async () => {
            await documentsStore.getDocuments();
          });

        setIsMinimized(true); // После ответа от сервера
      }}
    />
  );
});
