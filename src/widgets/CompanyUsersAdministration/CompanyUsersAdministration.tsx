import { useEffect, type FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Container, Typography } from '@mui/material';

import { User, UserForm, type UserFormProps } from '@entities/user';

import { UsersTable } from './UsersTable';
import userStores, { type UserStore } from './model';

export const CompanyUsersAdministration: FC<{ companyId: number }> = observer(
  ({ companyId }) => {
    const [model, setModel] = useState<UserStore>(
      userStores.getUserStoreForCompany(companyId),
    );
    useEffect(() => {
      const model = userStores.getUserStoreForCompany(companyId);
      setModel(model);
      void model.loadCompanyUsers(companyId);
    }, [companyId]);

    const [userFormProps, setUserFormProps] = useState<UserFormProps>();

    const users = model.users;
    if (users === undefined) return <div>users === undefined</div>; // Loader?

    const addUserClickHandler = (): void => {
      setUserFormProps({
        userInitialInfo: new User(),
        onCancel: () => {
          setUserFormProps(undefined);
        },
        onSubmit: (userData: User) => {
          /* Заблокировать форму */
          model
            .addUser(userData)
            .then() /* Закрыть форму */
            .catch(() => {}) /* Оставить форму открытой и показать ошибку */
            .finally(); /* Разблокировать форму */
          setUserFormProps(undefined);
        },
      });
    };

    const editUserClickHandler = (userToEditId: number): void => {
      setUserFormProps({
        userInitialInfo: model.users.find((u) => u.id === userToEditId) as User,
        onCancel: () => {
          setUserFormProps(undefined);
        },
        onSubmit: (userData: User) => {
          /* Заблокировать форму */
          model
            .updateUser(userData)
            .then() /* Закрыть форму */
            .catch(() => {}) /* Оставить форму открытой и показать ошибку */
            .finally(); /* Разблокировать форму */
          setUserFormProps(undefined);
        },
      });
    };

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
                {/* todo
                 Тут будет написано либо "моей организации", либо "организации <Название>".
                 Но это быстро не сделать, сделаю позже.
                 (надо, чтоб виджет знал о своём типе, и модель тоже - и обращалась к разным эндпойнтам.)
                */}
                Список сотрудников организации с id = {companyId} (доделать!)
              </Typography>
            </Box>
            <Box sx={{ mb: '1rem' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  textTransform: 'none',
                  width: 'fit-content',
                  height: '40px',
                  boxShadow: 'none',
                  borderRadius: '20px',
                  minWidth: '40px',
                  ':hover': {
                    boxShadow: 'none',
                  },
                  ':disabled': {
                    boxShadow: 'none',
                  },
                }}
                onClick={addUserClickHandler}
              >
                <Typography>Добавить сотрудника</Typography>
              </Button>
            </Box>
            <UsersTable users={users} onEditUserClick={editUserClickHandler} />
          </Box>
        </Container>
        {userFormProps !== undefined && <UserForm {...userFormProps} />}
      </>
    );
  },
);
