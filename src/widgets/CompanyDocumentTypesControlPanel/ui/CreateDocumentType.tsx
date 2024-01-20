import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Typography } from '@mui/material';

import { type CompanyDocumentTypesModel } from '../';

export const CreateDocumentType: FC<{ model: CompanyDocumentTypesModel }> =
  observer(({ model }) => {
    return (
      <Box sx={{ mb: '1rem', backgroundColor: 'olive' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'none',
            width: 'fit-content',
            height: '40px',
            boxShadow: 'none',
            borderRadius: '20px',
            minWidth: '40px',
            ':hover': {
              boxShadow: 'none',
            },
            ':disabled': {
              boxShadow: 'none',
            },
          }}
          // onClick={addUserClickHandler}
        >
          <Typography>Добавить сотрудника</Typography>
        </Button>
      </Box>
    );
  });
