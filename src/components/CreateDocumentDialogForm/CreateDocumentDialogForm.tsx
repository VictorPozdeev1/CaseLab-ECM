import React from 'react';
import type { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  type SelectChangeEvent,
  //  Typography,
} from '@mui/material';

import styles from './CreateDocumentDialogForm.module.css';

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
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value);
  };
  return (
    <Dialog
      className={styles.dialog}
      PaperProps={{ variant: 'elevation', className: styles.paper }}
      maxWidth={'md'}
      open={true}
      onClose={() => {
        console.log(
          'Пока что этот диалог сделан модальным, поэтому по клику по бэкдропу ничего не происходит.',
        );
      }}
    >
      <DialogTitle variant="h6" className={styles.title}>
        Создать документ
      </DialogTitle>
      <DialogContent sx={{ alignSelf: 'stretch' }}>
        <Box className={styles.inputGroup}>
          <TextField
            className={styles.documentNameInput}
            id="outlined-basic"
            label="Название"
            variant="outlined"
          />
          <Select
            className={styles.documentTypeSelect}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Box>
        <Box>
          {['attr1', 'attr2'].map((attr) => (
            <div key={attr}>{attr}</div>
          ))}
        </Box>
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
