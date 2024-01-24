import React, { type FC, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useCompaniesStore } from '@entities/company/model';
import { documentProcessesStore as processesStore } from '@entities/documentProcess';
import { documentViewPageStore as pageStore } from '@pages/DocumentViewPage/store';
import { usersStore } from '@entities/user';
import session from '@entities/session/session';
import { CommentInput } from './ui/textInput/CommentInput';
import { ReviewFormHeader } from './ui/ReviewFormHeader';
import { SendToReviewButton } from './ui/buttons/SendToReviewButton';
import { CancelReviewButton } from './ui/buttons/CancelReviewButton';
import { ReviewerSelect } from './ui/select/ReviewerSelect';
import { CompanySelect } from './ui/select/CompanySelect';

export const SendToReviewForm: FC = observer(() => {
  const companiesStore = useCompaniesStore();

  const [isOwnCompanyReviewer, setIsOwnCompanyReviewer] = useState(true);
  const [companyId, setCompanyId] = useState('');
  const [reviewerId, setReviewerId] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (processesStore.processesList !== undefined) {
      if (
        processesStore.processesList[0].recipientOrganization !==
        session.currentUserCompanyId
      ) {
        setIsOwnCompanyReviewer(false);
        setReviewerId(
          '' + processesStore.processesList[0].recipientOrganization,
        );
      } else {
        setReviewerId('' + processesStore.processesList[0].recipient);
      }
      setComment(processesStore.processesList[0].comment);
    }
  }, []);

  useEffect(() => {
    if (isOwnCompanyReviewer) {
      void companiesStore.loadCompanies();
    } else {
      void usersStore.loadOwnCompanyUsers();
    }
  }, [isOwnCompanyReviewer]);

  return (
    <form
      action="."
      onSubmit={(event) => {
        event.preventDefault();
        if (processesStore.isEmpty) {
          void processesStore.createAndSend(
            pageStore.document?.id as number,
            {
              isOwnCompany: isOwnCompanyReviewer,
              recipientId: isOwnCompanyReviewer ? +reviewerId : +companyId,
            },
            comment,
          );
          // void processesStore.create(
          //   pageStore.document?.id as number,
          //   +reviewerId,
          // );
          // void processesStore.createProcessInCompany(
          //   pageStore.document?.id as number,
          //   +companyId,
          // );
        } else {
          void processesStore.deleteAll();
        }
      }}
    >
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <ReviewFormHeader
          isOwnCompanyReviewer={isOwnCompanyReviewer}
          toggleButtonVisible={processesStore.isEmpty}
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
              disabled={!processesStore.isEmpty}
              onChange={(event) => {
                setReviewerId(event.target.value);
              }}
              userList={usersStore.ownCompanyUsers}
            />
          ) : (
            <CompanySelect
              value={companyId}
              disabled={!processesStore.isEmpty}
              onChange={(event) => {
                setCompanyId(event.target.value);
              }}
              companiesList={companiesStore.companies}
            />
          )}
          {processesStore.isEmpty ? (
            <SendToReviewButton
              disabled={
                (!isOwnCompanyReviewer && companyId === '') ||
                (isOwnCompanyReviewer && reviewerId === '')
              }
            />
          ) : (
            <CancelReviewButton />
          )}
        </Box>
        <CommentInput
          disabled={!processesStore.isEmpty}
          value={comment}
          onChange={(event) => {
            setComment(event?.target.value);
          }}
        />
      </Box>
    </form>
  );
});
