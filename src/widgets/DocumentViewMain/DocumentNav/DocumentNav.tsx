import { type FC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';

export const DocumentNav: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: 'var(--none, 0px)',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        borderRadius: 'var(--none, 0px)',
      }}
    >
      <IconButton aria-label="delete">
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
          fontFeatureSettings: "'clig' off, 'liga' off",
          fontFamily: 'Roboto',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '160%',
          letterSpacing: '0.15px',
        }}
      >
        Документы
      </Typography>
    </Box>
  );
};
