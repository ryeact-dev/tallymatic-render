import { modalStore } from '@/store';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '@/lib/helper/globalConstantUtil';
import { Button } from '@/common/ui/button';
import TooltipContainer from '@/common/tooltip-container/TooltipContainer';
import { PenBox, Trash } from 'lucide-react';

export default function CandidateOptions({ candidateData }) {
  const openModal = modalStore((state) => state.openModal);

  function deleteUser(id) {
    openModal({
      title: 'Confirmation',
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: `Remove this candidate?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.CANDIDATE_DELETE,
        id,
      },
    });
  }

  // Edit user
  function editUser(userInfo) {
    const modalTitle = <p className='text-primary'>Update Candidate</p>;

    openModal({
      title: modalTitle,
      bodyType: MODAL_BODY_TYPES.CANDIDATE_ADD_NEW,
      extraObject: userInfo,
      size: 'max-w-xl',
    });
  }

  return (
    <>
      <TooltipContainer content='Edit'>
        <Button
          onClick={() => editUser(candidateData)}
          variant='ghost'
          className='h-8 w-8 p-0 hover:bg-primary'
        >
          <PenBox className='w-5 h-5' />
        </Button>
      </TooltipContainer>
      {/* <TooltipContainer content='Delete' className={'bg-destructive'}>
        <Button
          onClick={() => deleteUser(candidateData.id)}
          variant='ghost'
          className='h-8 w-8 p-0 hover:bg-destructive'
        >
          <Trash className='w-5 h-5' />
        </Button>
      </TooltipContainer> */}
    </>
  );
}
