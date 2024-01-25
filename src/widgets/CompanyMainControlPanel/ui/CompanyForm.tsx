import React, { type FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { useCompaniesStore } from '@entities/company/model';
import { currentSessionStore } from '@entities/session';

// todo Не надо использовать стор другого виджета, надо использовать общий стор
import userStores, {
  type CompanyUsersModel,
} from '@widgets/CompanyUsersControlPanel/model';

interface CompanyFormData {
  name: string;
  defaultRecipient: string;
}

export const CompanyForm: FC = observer(() => {
  // todo Можно ли обойтись без этого? Получать сверху в пропсах нужную модель
  const { companyId } = useParams<{ companyId: string }>();
  const isMyCompanyRoute = location.pathname === '/myCompany';
  const currentCompanyId = isMyCompanyRoute
    ? currentSessionStore.currentUserCompanyId.toString()
    : companyId;
  const initialCompanyUsersStore = isMyCompanyRoute
    ? userStores.myCompanyUsersStore
    : userStores.getCustomCompanyUserStore(Number(currentCompanyId));
  const [changed, setChanged] = useState<boolean>(false);
  const navigate = useNavigate();
  const companiesStore = useCompaniesStore();
  // todo Можно бы загрузить сразу, раз уже есть companyId ? Но, думаю, не страшно..
  // А вообще, думаю, лучше получать это в пропсах сверху
  const [companyData, setCompanyData] = useState<CompanyFormData>({
    name: '',
    defaultRecipient: '',
  });

  // todo Тоже сверху передавать
  const [companyUsersStore, setCompanyUsersStore] = useState<CompanyUsersModel>(
    initialCompanyUsersStore,
  );

  useEffect(() => {
    try {
      const company = companiesStore.getCompany(Number(currentCompanyId));
      if (company !== null && company !== undefined) {
        setChanged(false);
        setCompanyData({
          name: company.name,
          defaultRecipient: String(company.defaultRecipientId),
        });
        const updatedCompanyUsersStore = isMyCompanyRoute
          ? userStores.myCompanyUsersStore
          : userStores.getCustomCompanyUserStore(Number(currentCompanyId));

        setCompanyUsersStore(updatedCompanyUsersStore);
      }
    } catch (error) {
      console.error('Error loading company data:', error);
    }
  }, [currentCompanyId, companiesStore.companies]);

  const handleSave = (): void => {
    companiesStore
      .updateCompany(Number(currentCompanyId), {
        name: companyData.name,
        defaultRecipient: Number(companyData.defaultRecipient),
      })
      .then(() => {
        setChanged(false);
      })
      .catch((error) => {
        console.error('Error saving organization:', error);
      });
  };

  const handleDelete = (): void => {
    companiesStore
      .deleteCompany(Number(currentCompanyId))
      .then(() => {
        navigate('/companies');
        if (isMyCompanyRoute) {
          currentSessionStore.logout();
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Error deleting organization:', error);
      });
  };

  const handleInputChange = (
    field: keyof CompanyFormData,
    value: string,
  ): void => {
    setChanged(true);
    setCompanyData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUserChange = (userId: number): void => {
    setChanged(true);
    setCompanyData((prevData) => ({
      ...prevData,
      defaultRecipient: String(userId),
    }));
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={5}
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
          onChange={(e) => {
            handleInputChange('name', e.target.value);
          }}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={5}
      >
        <Typography variant="h6" gutterBottom>
          Получатель по умолчанию*
        </Typography>
        {companyUsersStore.users.length > 0 ? (
          <Select
            name="defaultRecipient"
            label="Выберите получателя по умолчанию"
            variant="outlined"
            fullWidth
            sx={{ width: '60%' }}
            value={companyData.defaultRecipient}
            onChange={(e) => {
              handleUserChange(Number(e.target.value));
            }}
          >
            {companyUsersStore.users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName} {user.patronymic}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Нет доступных пользователей
          </Typography>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Удалить организацию
        </Button>
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
