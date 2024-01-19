import React, { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import { OrganizationForm } from './OrganizationForm';
import { OrganizationSidebar } from './OrganizationSidebar';

export const BaseCompanyMainControlPanel: FC<{ title: string }> = ({
  title,
}) => {
  return (
    <>
      <Box
        maxWidth={'lg'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
          width: '100%',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box>
          <OrganizationSidebar />
        </Box>
        <Box padding={'16px'} sx={{ width: '100%' }}>
          <Box
            marginBottom={'28px'}
            display={'flex'}
            alignItems={'center'}
            gap={'16px'}
            justifyContent={'center'}
          >
            <Typography variant="h5" fontWeight={'bold'}>
              {title}
            </Typography>
          </Box>
          <Box>
            <OrganizationForm />
          </Box>
        </Box>
      </Box>
    </>
  );
};
