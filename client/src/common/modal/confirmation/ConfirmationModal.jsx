import { useState } from 'react';
import { headerStore } from '@/store';

import { useNavigate } from 'react-router-dom';
import ConfirmationModalBody from './components/ConfirmationModalBody';
import { useDeleteUser, useLogoutUser } from '@/hooks/user';
import { useDeleteCompetition, useUpdateCompStatus } from '@/hooks/competition';
import { useDeleteCandidate } from '@/hooks/candidate';
import { useSubmitFinalScores } from '@/hooks/scoresheet';

export default function ConfirmationModal({ extraObject, closeModal }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const deleteUserMutation = useDeleteUser(setIsLoading, closeModal);

  const updateCompStatusMutation = useUpdateCompStatus(
    setIsLoading,
    closeModal
  );

  const deleteCompetitionMutation = useDeleteCompetition(
    setIsLoading,
    closeModal
  );

  const deleteCandidateMutation = useDeleteCandidate(setIsLoading, closeModal);

  const logoutUserMutation = useLogoutUser(setIsLoading, closeModal);

  const submitFinalScores = useSubmitFinalScores(setIsLoading, closeModal);

  return (
    <ConfirmationModalBody
      extraObject={extraObject}
      closeModal={closeModal}
      isLoading={isLoading}
      deleteUserMutation={deleteUserMutation}
      updateCompStatusMutation={updateCompStatusMutation}
      deleteCompetitionMutation={deleteCompetitionMutation}
      deleteCandidateMutation={deleteCandidateMutation}
      logoutUserMutation={logoutUserMutation}
      submitFinalScores={submitFinalScores}
    />
  );
}
