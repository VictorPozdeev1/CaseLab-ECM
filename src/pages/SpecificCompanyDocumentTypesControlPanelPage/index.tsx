import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { DocumentTypesGrid } from '@widgets/CompanyDocumentTypesControlPanel';
import { useCompaniesStore } from '@entities/company/model';
import { MainPanelTitle } from '@shared/components/MainPanelTitle';

import { byCompanyModels } from './model';

export const SpecificCompanyDocumentTypesControlPanelPage: FC = observer(() => {
  const { companyId: companyIdString } = useParams();
  const companyId = Number(companyIdString);

  if (Number.isNaN(companyId))
    return <div>Не существует организации с id = {companyIdString}</div>;

  const companyName = useCompaniesStore().getNameById(companyId);
  const model = byCompanyModels.getCustomCompanyModel(companyId);
  return (
    <>
      <MainPanelTitle
        title={`Шаблоны документов организации: ${
          companyName ?? 'id=' + companyId
        }`}
      />
      <DocumentTypesGrid model={model} />
    </>
  );
});
