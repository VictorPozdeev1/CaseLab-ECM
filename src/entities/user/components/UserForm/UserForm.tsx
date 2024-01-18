import { useState, type FC, useEffect } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { User } from '@entities/user/User';
import { type OrgDto, Service } from '@api';
import styles from './UserForm.module.css';
import { Roles } from '@entities/user';

export interface UserFormProps {
  userInitialInfo: User;
  onSubmit: (userData: User) => void;
  onCancel: () => void;
}

export const UserForm: FC<UserFormProps> = ({
  userInitialInfo,
  onCancel,
  onSubmit,
}) => {
  const userInitialInfoCopy: User = Object.create(User.prototype);
  Object.assign(userInitialInfoCopy, userInitialInfo);
  const [userInfo] = useState<User>(userInitialInfoCopy);
  const [organization, setOrg] = useState<OrgDto[]>();
  useEffect(() => {
    Service.getAllOrgs()
      .then((res) => {
        setOrg(res.content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally();
  }, [userInitialInfo]);

  return (
    <Dialog open={true} sx={{ width: '688px', margin: '0 auto' }}>
      <DialogTitle>
        {userInfo.id ===
        -1 /* Мб, сделать базовый класс UserData или UserWithNoId, чтобы не делать вот так? */
          ? 'Создание нового пользователя'
          : 'Редактирование пользователя ' + userInfo.shortName}
      </DialogTitle>
      <DialogContent
        sx={{
          borderTop: '1px solid #344054',
          borderBottom: '1px solid #344054',
        }}
      >
        <Box className={styles.inputBox}>
          <Typography className={styles.label}>Фамилия</Typography>
          <TextField
            sx={{ width: '446px' }}
            onChange={(e) => {
              userInfo.lastName = e.target.value;
            }}
            defaultValue={userInfo.lastName}
          />
        </Box>
        <Box className={styles.inputBox}>
          <Typography className={styles.label}>Имя</Typography>
          <TextField
            sx={{ width: '446px' }}
            onChange={(e) => {
              userInfo.firstName = e.target.value;
            }}
            defaultValue={userInfo.firstName}
          />
        </Box>
        <Box className={styles.inputBox}>
          <Typography className={styles.label}>Отчество</Typography>
          <TextField
            sx={{ width: '446px' }}
            onChange={(e) => {
              userInfo.patronymic = e.target.value;
            }}
            defaultValue={userInfo.patronymic}
          />
        </Box>
        <Box className={styles.inputBox}>
          <Typography className={styles.label}>Дата рождения</Typography>
          <TextField
            sx={{ width: '446px' }}
            onChange={(e) => {
              userInfo.dateOfBirth = e.target.value;
            }}
            defaultValue={userInfo.dateOfBirth}
          />
        </Box>
        <Box className={styles.inputBox}>
          <Typography className={styles.label}>email</Typography>
          <TextField
            sx={{ width: '446px' }}
            defaultValue={userInfo.email}
            onChange={(e) => {
              userInfo.email = e.target.value;
            }}
          />
        </Box>
        {userInfo.id === -1 ? (
          <Box className={styles.inputBox}>
            <Typography className={styles.label}> Оргинизация </Typography>
            <FormControl sx={{ width: '446px', height: '56px' }}>
              <Select
                key={
                  organization?.find(
                    (org) => org.id === userInfo.organizationId,
                  )?.name
                }
                defaultValue={
                  organization?.find(
                    (org) => org.id === userInfo.organizationId,
                  )?.name ?? ''
                }
                onChange={(e) => {
                  organization?.forEach((org) => {
                    if (org.name === e.target.value) {
                      userInfo.organizationId = org.id;
                    }
                  });
                }}
              >
                {organization?.map((org) => (
                  <MenuItem key={org.id} value={org.name}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ) : (
          ''
        )}

        <Box className={styles.inputBox}>
          <Typography className={styles.label}>Телефон</Typography>
          <TextField
            sx={{ width: '446px' }}
            defaultValue={userInfo.phone}
            onChange={(e) => {
              userInfo.phone = e.target.value;
            }}
          />
        </Box>
        <Box className={styles.inputBox}>
          <Typography className={styles.label}>Должность</Typography>
          <TextField
            sx={{ width: '446px' }}
            defaultValue={userInfo.post}
            onChange={(e) => {
              userInfo.post = e.target.value;
            }}
          />
        </Box>
        {userInfo.id === -1 ? (
          <Box className={styles.inputBox}>
            <Typography className={styles.label}>Роль</Typography>
            <FormControl sx={{ width: '446px' }}>
              <Select
                onChange={(e) => {
                  userInfo.role = e.target.value as string;
                }}
              >
                {Object.entries(Roles).map((e) => (
                  <MenuItem key={e[0]} value={e[0]}>
                    {e[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ) : (
          ''
        )}
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => {
            onCancel();
          }}
          className={styles.button}
        >
          Отменить
        </Button>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => {
            onSubmit(userInfo);
          }}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
