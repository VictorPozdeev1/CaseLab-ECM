import { type FC } from 'react';

// to use somewhere else?
interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export const CreateDocumentButton: FC<ButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Создать новый документ...</button>;
};
