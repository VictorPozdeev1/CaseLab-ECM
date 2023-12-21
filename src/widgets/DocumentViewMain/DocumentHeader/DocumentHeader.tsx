import { type FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';

export const DocumentHeader: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: 'var(--none, 0px)',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '41em',
        borderRadius: 'var(--none, 0px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          padding: 'var(--none, 0px)',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'var(--none, 0px)',
          flex: '1 0 0',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
            fontFeatureSettings: "'clig' off, 'liga' off",
            fontFamily: 'Roboto',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '160%',
            letterSpacing: '0.15px',
            marginBottom: '5px',
          }}
        >
          Трудовой договор №1
        </Typography>
        <Typography
          variant="subtitle1" // Выберите подходящий вариант подзаголовка
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          Создан 01.12.2023, 19:40 • Иванов И.И.{' '}
        </Typography>
      </Box>
      <Button variant="outlined" startIcon={<CreateIcon />}>
        РЕДАКТИРОВАТЬ
      </Button>
    </Box>
  );
};
