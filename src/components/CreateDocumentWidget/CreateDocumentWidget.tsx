import { useState, type FC } from 'react';
// import { currentUserStore } from '@store/index';
import { CreateDocumentButton } from '@components/CreateDocumentButton/CreateDocumentButton';
import { CreateDocumentForm } from '@components/CreateDocumentForm/CreateDocumentForm';

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
    <CreateDocumentForm
      onSubmit={(attributeValues) => {
        console.log(
          'Тут будет вызываться метод сохранения документа',
          attributeValues,
        );
        setIsMinimized(true); // После ответа от сервера
      }}
      onCancel={() => {
        setIsMinimized(true);
      }}
    />
  );
};
