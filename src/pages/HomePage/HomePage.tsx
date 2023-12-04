import { documentsStore } from '@store/index';
import { type FC } from 'react';

export const HomePage: FC = () => {
  console.log(documentsStore.getDocuments());
  return (
    <div>
      Здесь будет какая-то логика, какая страница возвращается данному юзеру по
      дефолту.
    </div>
  );
};
