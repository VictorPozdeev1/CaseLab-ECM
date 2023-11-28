import { type FC, useState } from 'react';
import { currentUser as currentUserStore } from '@store/store';
import { useLocation, useNavigate } from 'react-router-dom';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);
  const { state } = useLocation();
  const redirectBackUrl = state?.previousLocation?.pathname; // query parameters ???
  const navigate = useNavigate();
  return (
    <form
      style={loginInProgress ? { opacity: 0.7, pointerEvents: 'none' } : {}}
      onSubmit={(e) => {
        e.preventDefault();
        setLoginInProgress(true);
        currentUserStore
          .login(email, password)
          .then((loginSucceeded) => {
            if (loginSucceeded) navigate(redirectBackUrl);
          })
          .catch(() => {})
          .finally(() => {
            setLoginInProgress(false);
          });
      }}
    >
      <input
        placeholder="Логин"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Логин</button>
    </form>
  );
};
