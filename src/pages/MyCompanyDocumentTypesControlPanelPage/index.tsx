import { type FC } from 'react';
import { observer } from 'mobx-react-lite';

import { DocumentTypesGrid } from '@widgets/CompanyDocumentTypesControlPanel';
import { MainPanelTitle } from '@shared/components/MainPanelTitle';

import { myCompanyModel } from './model';

export const MyCompanyDocumentTypesControlPanelPage: FC = observer(() => {
  const model = myCompanyModel.instance;
  return (
    <>
      <MainPanelTitle title={'Моя организация'} />
      <DocumentTypesGrid model={model} />
    </>
  );
});
