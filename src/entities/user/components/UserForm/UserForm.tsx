import { useState, type FC } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { User } from '@entities/user/model/User';

import styles from './UserForm.module.css';

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
        <Box className={styles.inputBox}>
          <Typography className={styles.label}> Оргинизация </Typography>
          {/* todo: Сделать селектом */}
          <TextField
            sx={{ width: '446px' }}
            defaultValue={
              'id=' + userInfo.organizationId + '. Сделать селектом!'
            }
            onChange={(e) => {
              // if (userInfo.organizationName !== undefined) {
              //   userInfo.organizationName = e.target.value;
              // }
            }}
          />
        </Box>
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
        <Box className={styles.inputBox}>
          <Typography className={styles.label}>Роль</Typography>
          <TextField
            sx={{ width: '446px' }}
            defaultValue={userInfo.role}
            onChange={(e) => {
              userInfo.role = e.target.value;
            }}
          />
        </Box>
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
