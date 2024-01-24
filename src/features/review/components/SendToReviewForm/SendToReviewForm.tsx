import React, { type FC, useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useCompaniesStore } from '@entities/company/model';
import { documentProcessesStore as processesStore } from '@entities/documentProcess';
import { documentViewPageStore as pageStore } from '@pages/DocumentViewPage/store';
import { usersStore } from '@entities/user';
// import session from '@entities/session/session';
import { CommentInput } from './ui/textInput/CommentInput';
import { ReviewFormHeader } from './ui/ReviewFormHeader';
import { SendToReviewButton } from './ui/buttons/SendToReviewButton';
import { ReviewerSelect } from './ui/select/ReviewerSelect';
import { CompanySelect } from './ui/select/CompanySelect';

export const SendToReviewForm: FC = observer(() => {
  const companiesStore = useCompaniesStore();

  const [isOwnCompanyReviewer, setIsOwnCompanyReviewer] = useState(true);
  const [companyId, setCompanyId] = useState('');
  const [reviewerId, setReviewerId] = useState('');
  const [comment, setComment] = useState('');

  // список пользователей, которым документ не направлен на согласование
  const allowedCompanyUsers = useMemo(
    () =>
      usersStore.ownCompanyUsers?.filter(
        (user) => !processesStore.reviewerIds.includes(user.id),
      ),
    [usersStore.ownCompanyUsers, processesStore.reviewerIds],
  );

  // список компаний, в которые документ не направлен на согласование
  const allowedCompanies = useMemo(
    () =>
      companiesStore.companies.filter(
        (company) => !processesStore.companiesIds.includes(company.id),
      ),
    [companiesStore.companies, processesStore.companiesIds],
  );
  /* идея в том, направить документ на согласование можно максимум один раз для каждого сотрудника/организацию */

  useEffect(() => {
    if (usersStore.ownCompanyUsers === undefined) {
      void usersStore.loadOwnCompanyUsers();
    }
  }, []);

  useEffect(() => {
    if (isOwnCompanyReviewer) {
      if (companiesStore.isEmpty) {
        void companiesStore.loadCompanies();
      }
    } else {
      if (usersStore.ownCompanyUsers === undefined) {
        void usersStore.loadOwnCompanyUsers();
      }
    }
  }, [isOwnCompanyReviewer]);

  return (
    <form
      action="."
      onSubmit={(event) => {
        event.preventDefault();

        void processesStore.createAndSend(
          pageStore.document?.id as number,
          {
            isOwnCompany: isOwnCompanyReviewer,
            recipientId: isOwnCompanyReviewer ? +reviewerId : +companyId,
          },
          comment,
        );
      }}
    >
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <ReviewFormHeader
          isOwnCompanyReviewer={isOwnCompanyReviewer}
          // toggleButtonVisible={processesStore.isEmpty}
          onButtonClick={() => {
            setIsOwnCompanyReviewer((value) => !value);
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          {isOwnCompanyReviewer ? (
            <ReviewerSelect
              value={reviewerId}
              onChange={(event) => {
                setReviewerId(event.target.value);
              }}
              userList={allowedCompanyUsers}
            />
          ) : (
            <CompanySelect
              value={companyId}
              onChange={(event) => {
                setCompanyId(event.target.value);
              }}
              companiesList={allowedCompanies}
            />
          )}

          <SendToReviewButton
            disabled={
              (!isOwnCompanyReviewer && companyId === '') ||
              (isOwnCompanyReviewer && reviewerId === '')
            }
          />
        </Box>
        <CommentInput
          value={comment}
          onChange={(event) => {
            setComment(event?.target.value);
          }}
        />
      </Box>
    </form>
  );
});
