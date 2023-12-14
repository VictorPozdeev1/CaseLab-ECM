import { Container } from '@mui/material';
import { type FC } from 'react';

interface PropType {
  onSave: () => void;
  onCancel: () => void;
}

export const AgreementTypesBtnGroup: FC<PropType> = ({ onSave, onCancel }) => {
  return (
    <Container>
      <button onClick={onSave}>Сохранить</button>
      <button onClick={onCancel}>Отменить</button>
    </Container>
  );
};
