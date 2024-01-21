import React, { type FC, useState } from 'react';
import {
  Dialog,
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from '@mui/material';
import { Service as api } from '@api';

interface CreateCompanyModalProps {
  onSubmit: (name: string, inn: string) => void;
  onCancel: () => void;
}

export const CreateCompanyWidget: FC<CreateCompanyModalProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState<string>('');
  const [inn, setInn] = useState<string>('');

  const handleCreate = (): void => {
    try {
      api
        .createOrg({
          name,
          inn,
        })
        .then((response) => {
          // Assuming OrgDto has 'name' and 'inn' properties
          onSubmit(response.name, response.inn);
        })
        .catch((error) => {
          console.error('Error creating organization:', error);
        })
        .finally(() => {
          onCancel();
        });
    } catch (error) {
      console.error('Error creating organization:', error);
      onCancel();
    }
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <Paper>
        <DialogTitle>Создание организации</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              name="Название компании"
              variant="outlined"
              label="Введите название компании"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              name="ИНН"
              variant="outlined"
              label="Введите ИНН компании (10 цифр)"
              fullWidth
              margin="normal"
              value={inn}
              onChange={(e) => {
                setInn(e.target.value);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Отменить</Button>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Создать
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};
