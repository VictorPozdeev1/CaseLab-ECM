import { useEffect, type FC } from 'react';
import { Box } from '@mui/material';
import { DocumentViewMain } from '@widgets/DocumentViewMain/DocumentViewMain';
import { observer } from 'mobx-react-lite';
import { documentViewPageStore } from './store';
import { useNavigate, useParams } from 'react-router-dom';

export const DocumentViewPage: FC = observer(() => {
  const { documentName } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    void documentViewPageStore.loadDocumentByName(documentName as string);
    if (documentViewPageStore.document === undefined) {
      navigate('/myDocuments');
    }
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
