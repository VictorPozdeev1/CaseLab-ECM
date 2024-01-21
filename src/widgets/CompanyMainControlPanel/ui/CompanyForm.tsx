import React, { type FC, type ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { Service as api } from '@api';

interface CompanyFormData {
  name: string;
  defaultRecipient: string;
}

export const CompanyForm: FC = observer(() => {
  const { companyId } = useParams();
  const [companyData, setCompanyData] = useState<CompanyFormData>({
    name: '',
    defaultRecipient: '',
  });
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await api.getOrg(Number(companyId));
        const selectedCompany = response;

        if (selectedCompany != null) {
          setCompanyData({
            name: selectedCompany.name,
            defaultRecipient: String(selectedCompany.defaultRecipient),
          });
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    void fetchData();
    setChanged(false);
  }, [companyId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
    setChanged(true);
  };

  const handleSave = (): void => {
    api
      .updateOrg(Number(companyId), {
        name: companyData.name,
        defaultRecipient: Number(companyData.defaultRecipient),
      })
      .then((updatedOrg) => {
        console.log('Organization updated:', updatedOrg);
      })
      .catch((error) => {
        console.error('Error updating organization:', error);
      });
  };

  return (
    <Box
      sx={{
        padding: '20px',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Название*
        </Typography>
        <TextField
          name="name"
          label="Введите название организации"
          variant="outlined"
          fullWidth
          sx={{ width: '60%' }}
          value={companyData.name}
          onChange={handleInputChange}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Получатель по умолчанию*
        </Typography>
        <TextField
          name="defaultRecipient"
          label="Введите получателя по умолчанию"
          variant="outlined"
          fullWidth
          sx={{ width: '60%' }}
          value={companyData.defaultRecipient}
          onChange={handleInputChange}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!changed}
        >
          Сохранить
        </Button>
      </Box>
    </Box>
  );
});
