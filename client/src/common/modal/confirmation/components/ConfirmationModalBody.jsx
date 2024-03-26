import { Button } from '@/common/ui/button';
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '@/lib/helper/globalConstantUtil';

export default function ConfirmationModalBody({
  extraObject,
  closeModal,
  isLoading,
  deleteCandidateMutation,
  deleteUserMutation,
  deleteCompetitionMutation,
  submitFinalScores,
  updateCompStatusMutation,
  logoutUserMutation,
}) {
  const { message, type, id, competitionObj } = extraObject;

  const proceedWithYes = () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.USERS_DELETE) {
      // TODO if the user is a judge - scoresheets related to the judge should be deleted
      deleteUserMutation.mutate({ id });
    }

    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CANDIDATE_DELETE) {
      deleteCandidateMutation.mutate({ id });
    }

    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.COMPETITION_DELETE) {
      deleteCompetitionMutation.mutate({ id });
    }

    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.SUBMIT_FINAL) {
      submitFinalScores.mutate({ competitionObj });
    }

    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.COMPETITION_STATUS_UPDATE) {
      updateCompStatusMutation.mutate({ competitionObj });
    }

    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LOGOUT_USER) {
      logoutUserMutation.mutate();
    }
  };

  return (
    <>
      <p className=' mt-8 text-center text-base'>{message}</p>
      <div className='space-x-2 mt-12 flex justify-end'>
        <Button
          variant='outline'
          className='border-destructive text-destructive hover:bg-destructive'
          onClick={() => closeModal()}
        >
          Cancel
        </Button>

        <Button
          className={`${isLoading ? 'loading' : ''} px-6`}
          onClick={() => proceedWithYes()}
          // disabled={isLoading}
        >
          {isLoading ? 'Updating..' : 'Confirm'}
        </Button>
      </div>
    </>
  );
}
