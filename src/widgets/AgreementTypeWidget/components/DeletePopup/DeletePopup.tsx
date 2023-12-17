import { type FC } from 'react';
import { Box, Dialog, DialogTitle } from '@mui/material';
import { BtnsGroup } from '../BtnsGroup/BtnsGroup';

interface PropType {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
  onCancel: () => void;
  title?: string;
}

export const DeletePopup: FC<PropType> = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  onCancel,
}) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="dialog-title"
      open={isOpen}
      sx={{ minHeight: '500px', justifyContent: 'center' }}
    >
      <DialogTitle id="dialog-title">
        {title ?? 'Действие приведет к удалению элемента'}
      </DialogTitle>
      <Box
        sx={{
          minHeight: '100px',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '25px',
        }}
      >
        <BtnsGroup onSave={onSubmit} onCancel={onCancel} isVisible={true} />
      </Box>
    </Dialog>
  );
};
