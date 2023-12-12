import { type FC, useState } from 'react';

import { type User } from '../../User';

interface UserFormProps {
  user: User;
  onSave: (user: User) => void;
}

export const UserForm: FC<UserFormProps> = ({ user, onSave }) => {
  const [userState, setUserState] = useState<User>(user); // eslint-disable-line
  return (
    <div>
      {userState.email}
      <button
        onClick={() => {
          onSave(userState);
        }}
      ></button>
    </div>
  );
};
