import { Box, Container, Typography } from '@mui/material';
import { type FC } from 'react';

export const BaseCompanyMainControlPanel: FC<{ title: string }> = ({
  title,
}) => {
  return (
    <>
      <Container maxWidth={'lg'}>
        <Box padding={'16px'}>
          <Box
            marginBottom={'28px'}
            display={'flex'}
            alignItems={'center'}
            gap={'16px'}
          >
            <Typography variant="h5" fontWeight={'bold'}>
              {title}
            </Typography>
          </Box>
          <Box>?Задизабленная кнопка архивации?</Box>
        </Box>
        <Box
          sx={{ width: '100%', height: '400px', backgroundColor: 'cadetblue' }}
        ></Box>
      </Container>
    </>
  );
};
