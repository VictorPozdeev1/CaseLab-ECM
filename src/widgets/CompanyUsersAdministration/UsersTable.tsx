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
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import { EditRounded } from '@mui/icons-material';
import PasswordIcon from '@mui/icons-material/Password';
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
  onEditUserClickPass: (userToEditId: number) => void;
  onEditUserRole: (userData: User) => void;
}

export const UsersTable: FC<UsersTableProps> = observer(
  ({
    users,
    onEditUserClick,
    onEditUserClickPass,
    onEditUserRole,
  }): JSX.Element => {
    const tableData: ITableData[] = users.map((u) => ({
      id: u.id,
      name: u.shortName,
      post: u.post,
      role: u.role,
      email: u.email,
    }));
    const roles = ['USER', 'COMPANY_ADMIN', 'ADMIN'];
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
                    <Select
                      defaultValue={el.role}
                      sx={{ width: '150px' }}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      onChange={(e) => {
                        el.role = e.target.value;
                        onEditUserRole(
                          users.find((u) => {
                            u.role = e.target.value;
                            return u.id === el.id;
                          }) as User,
                        );
                      }}
                    >
                      {roles.map((el, i) => {
                        return (
                          <MenuItem key={i} value={el}>
                            {el}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      {el.email}
                      <Box>
                        <IconButton
                          onClick={() => {
                            onEditUserClick(el.id);
                          }}
                        >
                          <EditRounded />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            onEditUserClickPass(el.id);
                          }}
                        >
                          <PasswordIcon />
                        </IconButton>
                      </Box>
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
