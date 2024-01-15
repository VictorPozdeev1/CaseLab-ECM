import { type FC, useState } from 'react';
import { currentSessionStore } from '@entities/session';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { Box, Button, TextField } from '@mui/material';
import Logo from '@shared/components/Logo/Logo';

export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);
  const { state } = useLocation();
  const redirectBackUrl = state?.previousLocation?.pathname; // query parameters ???
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);
  const navigate = useNavigate();

  const getDisabled = (
    loginVal: string,
    passwordVal: string,
  ): { disabled?: boolean } => {
    if (loginVal === '' || passwordVal === '') return { disabled: true };
    return {};
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={'44px'}
      padding={'50px'}
    >
      <Logo size="medium" />
      {message != null && (
        <div
          className={`${styles.message} ${
            messageType === 'success'
              ? styles.successMessage
              : styles.errorMessage
          }`}
        >
          {message}
        </div>
      )}
      <Box width={'80%'}>
        <form
          style={loginInProgress ? { opacity: 0.7, pointerEvents: 'none' } : {}}
          onSubmit={(e) => {
            e.preventDefault();
            if (!loginInProgress) {
              setLoginInProgress(true);
              currentSessionStore
                .login(email, password)
                .then((loginSucceeded) => {
                  if (loginSucceeded) {
                    setMessage('Вход выполнен успешно');
                    setMessageType('success');
                    setTimeout(() => {
                      navigate(redirectBackUrl);
                    }, 1000);
                  } else {
                    setMessage(
                      'Произошла ошибка при аутентификации. Пожалуйста, попробуйте еще раз.',
                    );
                    setMessageType('error');
                  }
                })
                .catch((error) => {
                  console.error('Ошибка при аутентификации:', error);
                })
                .finally(() => {
                  setLoginInProgress(false);
                });
            }
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
};
