import { type FC } from 'react';
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
import { EditRounded } from '@mui/icons-material';
import { type User } from '@entities/user';
import { observer } from 'mobx-react-lite';

const TableCells: string[] = ['ФИО', 'Должность', 'Роль', 'Email'];

interface ITableData {
  id: number;
  name: string;
  post: string;
  role: string; // 'Пользователь' | 'Администратор';
  email: string;
}

interface UsersTableProps {
  users: User[];
  onEditUserClick: (userToEditId: number) => void;
}

export const UsersTable: FC<UsersTableProps> = observer(
  ({ users, onEditUserClick }): JSX.Element => {
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
            <TableRow>
              {TableCells.map((el) => {
                return (
                  <TableCell key={el}>
                    <Typography variant="subtitle2" fontWeight={500}>
                      {el}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
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
                      <IconButton
                        onClick={() => {
                          onEditUserClick(el.id);
                        }}
                      >
                        <EditRounded />
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
  },
);
