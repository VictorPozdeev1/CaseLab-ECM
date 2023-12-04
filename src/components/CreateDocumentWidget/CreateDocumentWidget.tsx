import { useState, type FC } from 'react';

// import { currentUserStore } from '@store/index';
import { CreateDocumentButton } from '@components/CreateDocumentButton/CreateDocumentButton';
import { CreateDocumentDialogForm } from '@components/CreateDocumentDialogForm/CreateDocumentDialogForm';

export const CreateDocumentWidget: FC = () => {
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
        console.log(
          'Тут будет вызываться метод сохранения документа',
          attributeValues,
        );
        setIsMinimized(true); // После ответа от сервера
      }}
    />
  );
};
