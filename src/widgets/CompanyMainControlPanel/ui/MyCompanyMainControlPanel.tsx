import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { BaseCompanyMainControlPanel } from './BaseCompanyMainControlPanel';

export const MyCompanyMainControlPanel: FC = observer(() => {
  return <BaseCompanyMainControlPanel title={`Моя организация`} />;
});
