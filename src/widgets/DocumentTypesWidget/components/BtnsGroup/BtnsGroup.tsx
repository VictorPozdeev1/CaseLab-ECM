import { Button, Container } from '@mui/material';
import { type FC } from 'react';
interface PropType {
  onSave: () => void;
  onCancel: () => void;
  isVisible: boolean;
}

export const BtnsGroup: FC<PropType> = ({ onSave, onCancel, isVisible }) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      {isVisible ? (
        <>
          <Button type="submit" onClick={onSave}>
            Подтвердить
          </Button>
          <Button onClick={onCancel}>Отменить</Button>
        </>
      ) : null}
    </Container>
  );
};
