import React, { type FC, type ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useLocalStore } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { getCompaniesStore } from '@entities/company/model/CompaniesStore';

interface CompanyFormData {
  name: string;
  defaultRecipient: string;
}

export const CompanyForm: FC = observer(() => {
  const companiesStore = useLocalStore(() => getCompaniesStore());
  const [companyData, setCompanyData] = useState<CompanyFormData>({
    name: '',
    defaultRecipient: '',
  });

  useEffect(() => {
    const selectedCompany = companiesStore.getSelectedCompany();

    if (selectedCompany != null) {
      setCompanyData({
        name: selectedCompany.name,
        defaultRecipient: String(selectedCompany.defaultRecipientId),
      });
    }
  }, [companiesStore.selectedCompanyId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (): void => {
    companiesStore.updateSelectedCompany({
      name: companyData.name,
      defaultRecipient: Number(companyData.defaultRecipient),
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
          disabled={companiesStore.getSelectedCompany() == null}
        >
          Сохранить
        </Button>
      </Box>
    </Box>
  );
});
