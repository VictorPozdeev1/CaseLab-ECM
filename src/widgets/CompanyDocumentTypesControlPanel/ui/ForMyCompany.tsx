import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Base } from './Base';

export const ForMyCompany: FC = observer(() => {
  return <Base title={`Моя организация`} />;
});
