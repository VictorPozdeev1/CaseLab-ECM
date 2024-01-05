import { type FC } from 'react';

// import { currentUserStore } from '@store/index';
// import { usersStore } from '@store/index';
import { observer } from 'mobx-react-lite';
import { Box, Button, Container, Typography } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { UsersTable } from './UsersTable';

export const CompanyUsersAdministration: FC<{ companyId: number }> = observer(
  ({ companyId }) => {
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
          <UsersTable companyId={companyId} />
        </Box>
      </Container>
    );
  },
);
