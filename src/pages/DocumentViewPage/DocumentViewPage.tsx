import { useEffect, type FC } from 'react';
import { Box } from '@mui/material';
import { DocumentViewMain } from '@widgets/DocumentViewMain/DocumentViewMain';
import { observer } from 'mobx-react-lite';
import { documentViewPageStore as pageStore } from './store';
import { documentProcessesStore as processesStore } from '@entities/documentProcess';
import { useNavigate, useParams } from 'react-router-dom';
import { useCompaniesStore } from '@entities/company/model';
import { usersStore } from '@entities/user';

export const DocumentViewPage: FC = observer(() => {
  const { documentName } = useParams();
  const navigate = useNavigate();
  const companiesStore = useCompaniesStore();
  useEffect(() => {
    void (async () => {
      void (await pageStore.loadDocumentByName(documentName as string));
      if (pageStore.document !== undefined) {
        await processesStore.load(pageStore.document.id);
      } else {
        navigate('/myDocuments');
      }
    })();
    void companiesStore.loadCompanies();
    void usersStore.loadOwnCompanyUsers();
    return () => {
      processesStore.clear();
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
      }}
    >
      <DocumentViewMain />
      {/* <DocumentViewTimeline /> */}
    </Box>
  );
});
