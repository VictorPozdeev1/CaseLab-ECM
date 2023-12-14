import { type FC } from 'react';

// import { currentUserStore } from '@store/index';
// import { usersStore } from '@store/index';
import { observer } from 'mobx-react-lite';

export const CompanyUsersAdministration: FC<{ companyId: number }> = observer(
  ({ companyId }) => {
    return (
      <div>
        <h2>
          Это страница пользователей, относящихся к организации с id={companyId}
        </h2>
        Тут будет список пользователей компании, где можно редачить их, задавать
        пароль, итд.
      </div>
    );
  },
);
