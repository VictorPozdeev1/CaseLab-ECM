import React, { type FC, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const DocumentSendToReview: FC = () => {
  const [value, selectValue] = useState('');

  const handleChange = (event: SelectChangeEvent): any => {
    selectValue(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <FormControl size="small" sx={{ m: 1, minWidth: 290 }}>
        <InputLabel id="select-label">Выберете проверяющего</InputLabel>
        <Select
          labelId="select-label"
          id="select-demo"
          value={value}
          label="Выберете проверяющего"
          onChange={handleChange}
        >
          <MenuItem value={10}>Григорьева А.А</MenuItem>
          <MenuItem value={20}>Иванов И.И</MenuItem>
        </Select>
      </FormControl>
      <Button
        disabled
        variant="contained"
        color="primary"
        size="small"
        sx={{ width: 259, height: '40px' }}
      >
        ОТПРАВИТЬ НА СОГЛАСОВАНИЕ
      </Button>
    </Box>
  );
};
