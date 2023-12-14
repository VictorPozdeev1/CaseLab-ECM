import React, { type FC } from 'react';
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

const TableCells: string[] = ['ФИО', 'Должность', 'Роль', 'Email'];

interface ITableData {
  id: number;
  name: string;
  post: string;
  role: 'Пользователь' | 'Администратор';
  email: string;
}

const TableData: ITableData[] = [
  {
    id: 1,
    name: 'Петров П. И.',
    post: 'Менеджер',
    role: 'Пользователь',
    email: 'ivanov@mail.ru',
  },
];

export const UsersTable: FC = (): JSX.Element => {
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
          {TableData.map((el) => {
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
