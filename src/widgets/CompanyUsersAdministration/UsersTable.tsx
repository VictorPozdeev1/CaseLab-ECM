import React, { useEffect, type FC } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  TableRow,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { CreateRounded } from '@mui/icons-material';
import model from './model';

const TableCells: string[] = ['ФИО', 'Должность', 'Роль', 'Email'];

interface ITableData {
  id: number;
  name: string;
  post: string;
  role: string; // 'Пользователь' | 'Администратор';
  email: string;
}

interface UsersTableProps {
  companyId: number;
}

export const UsersTable: FC<UsersTableProps> = ({ companyId }): JSX.Element => {
  useEffect(() => {
    void model.loadCompanyUsers(companyId);
  }, [companyId]);

  const users = model.usersByCompany.get(companyId);
  if (users === undefined) return <div>users === undefined</div>; // Loader?
  const tableData: ITableData[] = users.map((u) => ({
    id: u.id,
    name: u.shortName,
    post: u.post,
    role: u.role,
    email: u.email,
  }));

  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: '#F6F6F6' }}>
          {TableCells.map((el) => {
            return (
              <TableCell key={el}>
                <Typography variant="subtitle2" fontWeight={500}>
                  {el}
                </Typography>
              </TableCell>
            );
          })}
        </TableHead>
        <TableBody>
          {tableData.map((el) => {
            return (
              <TableRow key={el.id}>
                <TableCell>{el.name}</TableCell>
                <TableCell>
                  <Typography variant="body2">{el.post}</Typography>
                </TableCell>
                <TableCell>
                  <Chip sx={{ color: '#0000007A' }} label={el.role} />
                </TableCell>
                <TableCell>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    {el.email}
                    <IconButton>
                      <CreateRounded />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
