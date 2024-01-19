import React, { type FC } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export const OrganizationSidebar: FC = () => {
  const organizations = ['Организация 1', 'Организация 2', 'Организация 3'];

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
        {organizations.map((org, index) => (
          <ListItem
            button
            key={index}
            sx={{
              marginBottom: '15px',
              fontFamily: 'Manrope',
              fontSize: '16px',
            }}
          >
            <ListItemText primary={org} />
          </ListItem>
        ))}
        <Button variant="contained" color="primary">
          Добавить
          <AddIcon sx={{ marginLeft: '5px' }}></AddIcon>
        </Button>
      </List>
    </Box>
  );
};
