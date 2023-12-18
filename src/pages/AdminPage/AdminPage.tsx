import { Service, type UserUpdateDto } from '@api';
import { type User, UserForm } from '@entities/user';
import { observer } from 'mobx-react-lite';
import { type FC, useState, useEffect } from 'react';

export const AdminPage: FC = observer(() => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<User>();

  useEffect(() => {
    Service.getUserByEmail(userEmail)
      .then((res) => {
        const nUserInfo: User = {
          organizationName: '',
        };
        nUserInfo.id = res.id;
        nUserInfo.lastName = res.fullName?.split(' ')[0];
        nUserInfo.firstName = res.fullName?.split(' ')[1];
        nUserInfo.patronymic = res.fullName?.split(' ')[2];
        nUserInfo.dateOfBirth = res.dateOfBirth;
        nUserInfo.email = res.email;
        nUserInfo.phone = res.phone;
        nUserInfo.passportSeries = res.userPassportDto?.passportSeries;
        nUserInfo.passportNumber = res.userPassportDto?.passportNumber;
        nUserInfo.passportIssued = res.userPassportDto?.passportIssued;
        nUserInfo.passportDate = res.userPassportDto?.passportDate;
        nUserInfo.passportKp = res.userPassportDto?.passportKp;
        if (res.orgDto?.name !== undefined) {
          nUserInfo.organizationName = res.orgDto.name;
        }
        nUserInfo.role = res.role;
        nUserInfo.post = res.post;
        nUserInfo.organizationId = res.orgDto?.id;
        setUserInfo(nUserInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userEmail]);

  const handleUserEmail = (event: any): void => {
    setUserEmail(event.target.value);
  };

  if (isMinimized)
    return (
      <>
        <input type="text" onChange={handleUserEmail} value={userEmail} />
        <button
          onClick={() => {
            setIsMinimized(false);
          }}
        >
          Click
        </button>
      </>
    );
  return (
    <UserForm
      onCancel={() => {
        setIsMinimized(true);
      }}
      userInfo={userInfo as User}
      onSubmit={(userInfo: User) => {
        const newUserInfo: UserUpdateDto = {};
        newUserInfo.lastName = userInfo.lastName;
        newUserInfo.firstName = userInfo.firstName;
        newUserInfo.patronymic = userInfo.patronymic;
        newUserInfo.dateOfBirth = userInfo.dateOfBirth;
        newUserInfo.email = userInfo.email;
        newUserInfo.phone = userInfo.phone;
        newUserInfo.passportSeries = userInfo.passportSeries;
        newUserInfo.passportNumber = userInfo.passportNumber;
        newUserInfo.passportIssued = userInfo.passportIssued;
        newUserInfo.passportDate = userInfo.passportDate;
        newUserInfo.passportKp = userInfo.passportKp;
        Service.getOrgsByNameLike(userInfo.organizationName)
          .then((res) => {
            newUserInfo.organizationId = res[0].id;
            Service.updateUser(userInfo.id as number, newUserInfo)
              .then((res) => {
                console.log(res);
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });
      }}
    />
  );
});
