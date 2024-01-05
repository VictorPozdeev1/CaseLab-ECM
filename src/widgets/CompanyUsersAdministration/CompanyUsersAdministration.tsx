import { useEffect, type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Container, Typography } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { UsersTable } from './UsersTable';
import model from './model';

export const CompanyUsersAdministration: FC<{ companyId: number }> = observer(
  ({ companyId }) => {
    useEffect(() => {
      void model.loadCompanyUsers(companyId);
    }, [companyId]);

    const users = model.usersByCompany.get(companyId);
    if (users === undefined) return <div>users === undefined</div>; // Loader?

    return (
      <Container maxWidth={'lg'}>
        <Box padding={'16px'}>
          <Box
            marginBottom={'28px'}
            display={'flex'}
            alignItems={'center'}
            gap={'16px'}
          >
            <Typography variant="h5" fontWeight={'bold'}>
              Список пользователей организации {companyId}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                textTransform: 'none',
                width: '40px',
                height: '40px',
                boxShadow: 'none',
                borderRadius: '50%',
                padding: '0 !important',
                minWidth: '40px',
                ':hover': {
                  boxShadow: 'none',
                },
                ':disabled': {
                  boxShadow: 'none',
                },
              }}
            >
              <AddRounded />
            </Button>
          </Box>
          <UsersTable users={users} />
        </Box>
      </Container>
    );
  },
);
