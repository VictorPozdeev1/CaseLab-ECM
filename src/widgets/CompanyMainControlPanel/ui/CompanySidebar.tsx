import React, { type FC, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { observer } from 'mobx-react';
import { getCompaniesStore } from '@entities/company/model/CompaniesStore';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateCompanyWidget } from '@widgets/CreateCompanyWidget';

export const CompanySidebar: FC = observer(() => {
  const companiesStore = getCompaniesStore();
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleCreateCompany = (): void => {
    closeModal();
  };

  return (
    <Box sx={{ backgroundColor: '#EDEDED', height: '100%' }}>
      <List
        sx={{
          padding: '16px',
          width: '250px',
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        {companiesStore.companies.map((company) => (
          <ListItem
            button
            key={company.id}
            sx={{
              marginBottom: '15px',
              fontFamily: 'Manrope',
              fontSize: '16px',
              backgroundColor:
                Number(companyId) === company.id ? 'white' : 'transparent',
              color:
                Number(companyId) === company.id ? 'mediumBlue' : 'inherit',
            }}
            onClick={() => {
              navigate(`/companies/${company.id}`);
            }}
          >
            <ListItemText primary={company.name} />
          </ListItem>
        ))}
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '100%' }}
          onClick={openModal}
        >
          Добавить
          <AddIcon sx={{ marginLeft: '5px' }}></AddIcon>
        </Button>

        {isModalOpen && (
          <CreateCompanyWidget
            onSubmit={handleCreateCompany}
            onCancel={closeModal}
          />
        )}
      </List>
    </Box>
  );
});
