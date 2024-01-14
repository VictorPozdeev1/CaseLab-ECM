import React, { type FC, useEffect, useState } from 'react';
import { currentSessionStore, errorStore } from '@store/index';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import Logo from '@shared/components/Logo/Logo';
import Unauthorized from '@processes/RequireAuth/Unauthorized';
import { observer } from 'mobx-react-lite';

export const LoginForm: FC = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);
  const navigate = useNavigate();

  const getDisabled = (
    loginVal: string,
    passwordVal: string,
  ): { disabled?: boolean } => {
    if (loginVal === '' || passwordVal === '') return { disabled: true };
    return {};
  };

  useEffect(() => {
    errorStore.clearError();
    errorStore.setLoginPage();
  }, []);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={'44px'}
      padding={'50px'}
    >
      <Logo size="medium" />
      <Box width={'80%'}>
        {errorStore.showError && <Unauthorized />}
        <form
          style={
            loginInProgress
              ? { opacity: 0.7, pointerEvents: 'none' }
              : { marginTop: '40px' }
          }
          onSubmit={(e) => {
            e.preventDefault();
            if (!loginInProgress) {
              setLoginInProgress(true);
              void currentSessionStore.login(email, password);
              setLoginInProgress(false);
            }
            setTimeout(() => {
              if (currentSessionStore.isAuth) {
                errorStore.clearError();
                errorStore.clearLoginPage();
                navigate('/');
              }
            }, 1000);
          }}
        >
          <TextField
            label="Логин"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
            sx={{
              width: '100%',
              marginBottom: '20px',
            }}
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
            sx={{
              width: '100%',
              marginBottom: '44px',
              borderRadius: '8px',
            }}
          />
          {/* <div className={styles.checkbox}>
              <input type="checkbox" id="rememberUser" />
              <label htmlFor="rememberUser">Запомнить меня</label>
            </div> */}
          <Button
            {...getDisabled(email, password)}
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              width: '100%',
              boxShadow: 'none',
              height: '56px',
              borderRadius: '8px',
              ':hover': {
                boxShadow: 'none',
              },
              ':disabled': {
                boxShadow: 'none',
              },
            }}
          >
            Войти
          </Button>
        </form>
      </Box>
    </Box>
  );
});
