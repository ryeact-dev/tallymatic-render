import { MODAL_BODY_TYPES } from '@/lib/helper/globalConstantUtil';
import AddUserModalBody from '@/common/modal/add-user/AddUserModalBody';
import ConfirmationModal from '@/common/modal/confirmation/ConfirmationModal';
import { modalStore } from '@/store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/ui/dialog';
import PasswordResetModalBody from '@/common/modal/password-reset/PasswordResetModalBody';
import AddCompetitionModalBody from '@/common/modal/add-competition/AddCompetitionModalBody';
import AddCandidateModalBody from '@/common/modal/add-candidate/AddCandidateModalBody';
import AddCandidateScoreModalBody from '@/common/modal/add-candidate-score/AddCandidateScoreModalBody';

// import ConfirmationModal from '@/common/modal/confirmation/ConfirmationModal';
// import ConfirmationModal from '../features/common/ConfirmationModal';
// import AddFinalistModal from '../features/results/finalists/components/AddFinalistModal';
// import AddCandidateModalBody from '../features/settings/candidates/components/AddCandidateModalBody';
// import AddCompetitionModalBody from '../features/settings/competitions/components/AddCompetitionModalBody';
// import AddUserModalBody from 'features/common/AddUserModalBody';
// import UpdateUserPasswordModal from 'features/common/UpdateUserPasswordModal';

function ModalContainer() {
  const [isOpen, size, bodyType, extraObject, title, closeModal] = modalStore(
    (state) => [
      state.isOpen,
      state.size,
      state.bodyType,
      state.extraObject,
      state.title,
      state.closeModal,
    ]
  );

  const close = () => {
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      {/* <DialogTrigger>x</DialogTrigger> */}
      <DialogContent className={`${size}`}>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl font-bold'>
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className='my-4'>
          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.COMPETITION_ADD_NEW]: (
                <AddCompetitionModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CANDIDATE_SCORE]: (
                <AddCandidateScoreModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CANDIDATE_ADD_NEW]: (
                <AddCandidateModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.FINALIST_ADD]: {
                /* <AddFinalistModal extraObject={extraObject} /> */
              },
              [MODAL_BODY_TYPES.RESET_PASSWORD]: (
                <PasswordResetModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),

              [MODAL_BODY_TYPES.USERS_ADD_NEW]: (
                <AddUserModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModal
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalContainer;
