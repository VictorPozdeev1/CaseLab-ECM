import { type FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Container, Typography } from '@mui/material';
import { type PasswordDto, Service } from '@api';
import { User, UserForm, type UserFormProps } from '@entities/user';
import {
  type UserPassFormProps,
  UserPasswordForm,
} from '@entities/user/components/UserPasswordForm/UserPasswordForm';
import { UsersTable } from './UsersTable';
import { type CompanyUsersModel } from '../model';

export const BaseCompanyUsersControlPanel: FC<{
  title: string;
  model: CompanyUsersModel;
}> = observer(({ title, model }) => {
  const [userFormProps, setUserFormProps] = useState<UserFormProps>();
  const [userPassFormProps, setPassFormProps] = useState<UserPassFormProps>();
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

  const editUserClickPass = (userToEditId: number): void => {
    setPassFormProps({
      userInitialInfo: model.users.find((u) => u.id === userToEditId) as User,
      onCancel: () => {
        setPassFormProps(undefined);
      },
      onSubmit: (password: string) => {
        /* Заблокировать форму */
        Service.setUserPassword(userToEditId, {
          password,
        } as unknown as PasswordDto)
          .then() /* Закрыть форму */
          .catch(() => {}) /* Оставить форму открытой и показать ошибку */
          .finally();
        setPassFormProps(undefined);
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
              {title}
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
          <UsersTable
            users={users}
            onEditUserClick={editUserClickHandler}
            onEditUserClickPass={editUserClickPass}
          />
        </Box>
      </Container>
      {userFormProps !== undefined && <UserForm {...userFormProps} />}
      {userPassFormProps !== undefined && (
        <UserPasswordForm {...userPassFormProps} />
      )}
    </>
  );
});
