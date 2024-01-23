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
import { getCompaniesStore } from '@entities/company/model';

interface CreateCompanyModalProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export const CreateCompanyWidget: FC<CreateCompanyModalProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState<string>('');
  const [inn, setInn] = useState<string>('');
  const [innError, setInnError] = useState<string | null>(null);
  const companiesStore = getCompaniesStore();

  const validateInn = (value: string): boolean => {
    const isValid = /^\d{10}$/.test(value);
    return isValid;
  };

  const handleCreate = (): void => {
    if (!validateInn(inn)) {
      setInnError('Введите корректный ИНН (10 цифр)');
      return;
    }

    companiesStore
      .createCompany({
        name,
        inn,
      })
      .then(() => {
        onSubmit();
      })
      .catch((error) => {
        console.error('Error creating organization:', error);
      })
      .finally(() => {
        onCancel();
      });
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
                setInnError(null);
              }}
              error={innError !== null && innError !== ''}
              helperText={innError}
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
