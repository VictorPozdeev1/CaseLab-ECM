import { type User } from '@entities/user/model/User';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from '@mui/material';
import { type FC } from 'react';
import styles from './UserPasswordForm.module.css';
export interface UserPassFormProps {
  userInitialInfo: User;
  onSubmit: (userPass: string) => void;
  onCancel: () => void;
}
export const UserPasswordForm: FC<UserPassFormProps> = ({
  userInitialInfo,
  onCancel,
  onSubmit,
}) => {
  let userPass: string;

  return (
    <Dialog open={true} sx={{ width: '688px', margin: '0 auto' }}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {'Пароль для сотрудника: ' + userInitialInfo.shortName}
      </DialogTitle>
      <Box className={styles.inputBox}>
        <TextField
          sx={{ width: '552px', margin: '0 auto' }}
          onChange={(e) => {
            userPass = e.target.value;
          }}
        />
      </Box>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '552px',
          margin: '0 auto',
        }}
      >
        <Button
          className={styles.button}
          onClick={() => {
            onCancel();
          }}
        >
          Отменить
        </Button>
        <Button
          className={styles.button}
          variant="contained"
          onClick={() => {
            if (userPass.length < 8) {
              alert('Пароль слишком короткий');
            } else {
              onSubmit(userPass);
            }
          }}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
