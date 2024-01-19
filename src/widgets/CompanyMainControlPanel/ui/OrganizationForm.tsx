import React, { type FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export const OrganizationForm: FC = () => {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Название*
        </Typography>
        <TextField
          label="Введите название компании"
          variant="outlined"
          fullWidth
          sx={{ width: '60%' }}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Typography variant="h6" gutterBottom>
          ИНН*
        </Typography>
        <TextField
          label="Введите ИНН"
          variant="outlined"
          fullWidth
          sx={{ width: '60%' }}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Получатель по умолчанию*
        </Typography>
        <TextField
          label="Введите получателя по умолчанию"
          variant="outlined"
          fullWidth
          sx={{ width: '60%' }}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Сохранить
        </Button>
        <Button variant="contained" color="secondary">
          Отмена
        </Button>
      </Box>
    </Box>
  );
};
