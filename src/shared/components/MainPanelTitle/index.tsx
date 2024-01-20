import { Box, Typography } from '@mui/material';
import { type FC } from 'react';

export const MainPanelTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <Box
      sx={{ backgroundColor: 'green' }}
      marginBottom={'28px'}
      display={'flex'}
      alignItems={'center'}
      gap={'16px'}
    >
      <Typography variant="h5" fontWeight={'bold'}>
        {title}
      </Typography>
    </Box>
  );
};
