import type { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface CreateDocumentFormProps {
  onSubmit: (
    attributeValues: Array<{ attributeId: number; attributeValue: string }>,
  ) => void;
  onCancel: () => void;
}

export const CreateDocumentDialogForm: FC<CreateDocumentFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  return (
    <Dialog
      open={true}
      onClose={() => {
        console.log(
          'Пока что этот диалог сделан модальным, поэтому по клику по бэкдропу ничего не происходит.',
        );
      }}
    >
      <DialogTitle>
        <Typography variant="h6">Создать документ</Typography>
      </DialogTitle>
      <DialogContent>
        {['attr1', 'attr2'].map((attr) => (
          <div key={attr}>{attr}</div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            console.log('cancel clicked');
            onCancel();
          }}
        >
          Отменить
        </Button>
        <Button
          onClick={() => {
            console.log('ok clicked');
            onSubmit([
              { attributeId: 1, attributeValue: 'a1' },
              { attributeId: 2, attributeValue: 'dsjfh' },
            ]);
          }}
        >
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};
