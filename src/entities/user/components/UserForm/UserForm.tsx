import { type FC } from 'react';
import styles from './UserForm.module.css';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { type User } from '@entities/user/User';

interface EditingUserFormProps {
  userInfo: User;
  onSubmit: (userData: User) => void;
  onCancel: () => void;
}

export const UserForm: FC<EditingUserFormProps> = observer(
  ({ userInfo, onCancel, onSubmit }) => {
    return (
      <Dialog open={true} sx={{ width: '688px', margin: '0 auto' }}>
        <DialogActions>
          <CloseIcon
            color="action"
            onClick={() => {
              onCancel();
            }}
          />
        </DialogActions>
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
            <TextField
              sx={{ width: '446px' }}
              defaultValue={userInfo.organizationName}
              onChange={(e) => {
                if (userInfo.organizationName !== undefined) {
                  userInfo.organizationName = e.target.value;
                }
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
          <Box className={styles.inputBox}>
            <Typography className={styles.label}>
              Паспорт серия/номер
            </Typography>
            <TextField
              sx={{ width: '446px' }}
              defaultValue={
                userInfo.passportSeries + ' ' + userInfo.passportNumber
              }
              onChange={(e) => {
                userInfo.passportSeries = e.target.value.split(' ')[0];
                userInfo.passportNumber = e.target.value.split(' ')[1];
              }}
            />
          </Box>
          <Box className={styles.inputBox}>
            <Typography className={styles.label}>Дата выдачи</Typography>
            <TextField
              sx={{ width: '446px' }}
              defaultValue={userInfo.passportDate}
              onChange={(e) => {
                userInfo.passportDate = e.target.value;
              }}
            />
          </Box>
          <Box className={styles.inputBox}>
            <Typography className={styles.label}>Код подразделения</Typography>
            <TextField
              sx={{ width: '446px' }}
              defaultValue={userInfo.passportKp}
              onChange={(e) => {
                userInfo.passportKp = e.target.value;
              }}
            />
          </Box>
          <Box className={styles.inputBox}>
            <Typography className={styles.label}>Паспорт выдан</Typography>
            <TextField
              sx={{ width: '446px' }}
              defaultValue={userInfo.passportIssued}
              onChange={(e) => {
                userInfo.passportIssued = e.target.value;
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
  },
);
