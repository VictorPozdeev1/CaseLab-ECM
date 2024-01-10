import { type FC } from 'react';
import React from 'react';
import { CenteredLayout } from '@shared/layouts/CenteredLayout';
import { LoginForm } from '@features/login';

export const LoginPage: FC = () => {
  return (
    <CenteredLayout>
      <LoginForm />
    </CenteredLayout>
  );
};
