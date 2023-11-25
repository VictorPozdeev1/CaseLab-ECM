import { FC, useContext, useState } from "react";
import { Context } from "../..";

export const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { store } = useContext(Context);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        store.login(email, password);
        console.log(`Auth - ${store.isAuth}`);
      }}
    >
      <input
        placeholder="Логин"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Логин</button>
    </form>
  );
};
