import { Service, type UserReplyDto } from '@api';
import { UserForm } from '@entities/user';
import { observer } from 'mobx-react-lite';
import { type FC, useState, useEffect } from 'react';

export const AdminPage: FC = observer(() => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserReplyDto>([] as UserReplyDto);

  useEffect(() => {
    Service.getUserByEmail(userEmail)
      .then((res) => {
        setUserInfo(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userEmail]);

  const handleUserEmail = (event: any): void => {
    setUserEmail(event.target.value);
  };

  if (isMinimized)
    return (
      <>
        <input type="text" onChange={handleUserEmail} value={userEmail} />
        <button
          onClick={() => {
            setIsMinimized(false);
          }}
        >
          Click
        </button>
      </>
    );
  return (
    <UserForm
      onCancel={() => {
        setIsMinimized(true);
      }}
      userInfo={userInfo}
      setUserInfo={setUserInfo}
    />
  );
});
