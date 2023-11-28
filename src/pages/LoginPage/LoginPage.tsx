import React, {
  type FC,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
// import store from '@store/store';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { CaselabEcmApi } from '@api/CaselabEcmApi';
import logo from './logo.png';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);
  const [rememberUser, setRememberUser] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleRememberUserChange = () => {
    setRememberUser(!rememberUser);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await CaselabEcmApi.loginService(email, password);

      setMessage('Вход выполнен успешно');
      setMessageType('success');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setMessage(
        'Произошла ошибка при аутентификации. Пожалуйста, попробуйте еще раз.',
      );
      setMessageType('error');
    }
  };

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
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              // eslint-disable-next-line no-lone-blocks
              {
                setEmail(e.target.value);
              }
            }}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              // eslint-disable-next-line no-lone-blocks
              {
                setPassword(e.target.value);
              }
            }}
            className={styles.input}
          />

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="rememberUser"
              checked={rememberUser}
              onChange={handleRememberUserChange}
            />
            <label htmlFor="rememberUser">Запомнить меня</label>
          </div>

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button onClick={handleLogin} className={styles.button}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
