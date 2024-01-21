import React, { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import { CompanyForm } from './CompanyForm';
import { useParams, useLocation } from 'react-router-dom';
import { CompanySidebar } from './CompanySidebar';

export const BaseCompanyMainControlPanel: FC<{
  title: string;
}> = ({ title }) => {
  const { companyId } = useParams();
  const location = useLocation();
  const isMyCompanyRoute = location.pathname === '/myCompany';
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
        {isMyCompanyRoute ? null : (
          <Box>
            <CompanySidebar />
          </Box>
        )}
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
            {(companyId !== null && companyId !== undefined) ||
            isMyCompanyRoute ? (
              <CompanyForm />
            ) : (
              <Box></Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
