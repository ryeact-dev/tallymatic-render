import { modalStore } from '@/store';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '@/lib/helper/globalConstantUtil';

import { Button } from '@/common/ui/button';
import TooltipContainer from '@/common/tooltip-container/TooltipContainer';
import { PenBox, Trash } from 'lucide-react';

export default function CompetitionOptions({ competition }) {
  const openModal = modalStore((state) => state.openModal);

  const deleteCompetition = (id) => {
    openModal({
      title: 'Confirmation',
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: `Remove this competition?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.COMPETITION_DELETE,
        id,
      },
    });
  };

  // Edit competition
  const editCompetition = (compInfo) => {
    const modalTitle = <p className='text-primary'>Update Competition</p>;

    openModal({
      title: modalTitle,
      bodyType: MODAL_BODY_TYPES.COMPETITION_ADD_NEW,
      extraObject: compInfo,
    });
  };

  return (
    <>
      <TooltipContainer content='Edit'>
        <Button
          onClick={() => editCompetition(competition)}
          variant='ghost'
          className='h-8 w-8 p-0 hover:bg-primary'
        >
          <PenBox className='w-5 h-5' />
        </Button>
      </TooltipContainer>
    </>
  );
}
