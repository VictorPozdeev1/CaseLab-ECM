import { type FC } from 'react';
import styles from './UserForm.module.css';
import { Service, type UserReplyDto, type UserUpdateDto } from '@api';
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

interface EditingUserFormProps {
  userInfo: UserReplyDto;
  onSubmit: (userData: UserReplyDto) => void;
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
            <Typography className={styles.label}>ФИО*</Typography>
            <TextField
              sx={{ width: '446px' }}
              onChange={(e) => {
                userInfo.fullName = e.target.value;

                onSubmit(userInfo);
              }}
              defaultValue={userInfo.fullName}
            />
          </Box>
          <Box className={styles.inputBox}>
            <Typography className={styles.label}>Дата рождения</Typography>
            <TextField
              sx={{ width: '446px' }}
              onChange={(e) => {
                userInfo.dateOfBirth = e.target.value;

                onSubmit(userInfo);
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

                onSubmit(userInfo);
              }}
            />
          </Box>
          <Box className={styles.inputBox}>
            <Typography className={styles.label}> Оргинизация </Typography>
            <TextField
              sx={{ width: '446px' }}
              defaultValue={userInfo.orgDto?.name}
              onChange={(e) => {
                if (userInfo.orgDto !== undefined) {
                  userInfo.orgDto.name = e.target.value;
                }

                onSubmit(userInfo);
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

                onSubmit(userInfo);
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

                onSubmit(userInfo);
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

                onSubmit(userInfo);
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
                userInfo.userPassportDto?.passportSeries +
                ' ' +
                userInfo.userPassportDto?.passportNumber
              }
              onChange={(e) => {
                if (userInfo.userPassportDto !== undefined) {
                  userInfo.userPassportDto.passportSeries =
                    e.target.value.split(' ')[0];
                  userInfo.userPassportDto.passportNumber =
                    e.target.value.split(' ')[1];
                }

                onSubmit(userInfo);
              }}
            />
          </Box>
          <Box className={styles.inputBox}>
            <Typography className={styles.label}>Дата выдачи</Typography>
            <TextField
              sx={{ width: '446px' }}
              defaultValue={userInfo.userPassportDto?.passportDate}
              onChange={(e) => {
                if (userInfo.userPassportDto !== undefined) {
                  userInfo.userPassportDto.passportDate = e.target.value;
                }
                onSubmit(userInfo);
              }}
            />
          </Box>
          <Box className={styles.inputBox}>
            <Typography className={styles.label}>Код подразделения</Typography>
            <TextField
              sx={{ width: '446px' }}
              defaultValue={userInfo.userPassportDto?.passportKp}
              onChange={(e) => {
                if (userInfo.userPassportDto !== undefined) {
                  userInfo.userPassportDto.passportKp = e.target.value;
                }
                console.log(userInfo.userPassportDto?.passportKp);
                onSubmit(userInfo);
              }}
            />
          </Box>
          <Box className={styles.inputBox}>
            <Typography className={styles.label}>Паспорт выдан</Typography>
            <TextField
              sx={{ width: '446px' }}
              defaultValue={userInfo.userPassportDto?.passportIssued}
              onChange={(e) => {
                if (userInfo.userPassportDto !== undefined) {
                  userInfo.userPassportDto.passportIssued = e.target.value;
                }

                onSubmit(userInfo);
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
              const newUserInfo: UserUpdateDto = {};
              newUserInfo.lastName = userInfo.fullName?.split(' ')[2];
              newUserInfo.firstName = userInfo.fullName?.split(' ')[0];
              newUserInfo.patronymic = userInfo.fullName?.split(' ')[1];
              newUserInfo.dateOfBirth = userInfo.dateOfBirth;
              newUserInfo.email = userInfo.email;
              newUserInfo.phone = userInfo.phone;
              newUserInfo.passportSeries =
                userInfo.userPassportDto?.passportSeries;
              newUserInfo.passportNumber =
                userInfo.userPassportDto?.passportNumber;
              newUserInfo.passportIssued =
                userInfo.userPassportDto?.passportIssued;
              newUserInfo.passportDate = userInfo.userPassportDto?.passportDate;

              newUserInfo.passportKp = userInfo.userPassportDto?.passportKp;
              Service.getAllOrgs()
                .then((res) => {
                  res.forEach((org) => {
                    if (org.name === userInfo.orgDto?.name) {
                      newUserInfo.organizationId = org.id;
                    }
                  });
                })
                .catch((e) => {
                  console.log(e);
                });

              newUserInfo.role = userInfo.role;
              newUserInfo.post = userInfo.post;

              console.log(newUserInfo);
              Service.updateUser(userInfo.id as number, newUserInfo)
                .then((res) => {
                  console.log(res);
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);
