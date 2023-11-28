import { LogoutButton } from '@components/LogoutButton/LogoutButton';
import { type FC } from 'react';

export const Header: FC = () => {
  return (
    <div
      style={{ width: '100%', height: '100px', backgroundColor: 'lightgray' }}
    >
      <h2>Header</h2>
      <LogoutButton />
    </div>
  );
};
