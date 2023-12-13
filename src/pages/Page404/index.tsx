import { Box, Typography } from '@mui/material';
import { type FC } from 'react';

export const Page404: FC = () => {
  return (
    <Box
      width={'100%'}
      minHeight={'96vh'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'28px'}
        alignItems={'center'}
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h4">Страница не найдена</Typography>
      </Box>
    </Box>
  );
};
