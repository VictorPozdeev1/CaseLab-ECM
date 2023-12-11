import { type FC, useState } from 'react';
import { currentSessionStore } from '@store/index';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import styles from './LoginPage.module.css';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);
  const { state } = useLocation();
  const redirectBackUrl = state?.previousLocation?.pathname; // query parameters ???
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <img src={logo} alt="Росатом" className={styles.image} />
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
          <input
            placeholder="Логин"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={styles.input}
          />
          <input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={styles.input}
          />
          <div className={styles.checkbox}>
            <input type="checkbox" id="rememberUser" />
            <label htmlFor="rememberUser">Запомнить меня</label>
          </div>
          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
