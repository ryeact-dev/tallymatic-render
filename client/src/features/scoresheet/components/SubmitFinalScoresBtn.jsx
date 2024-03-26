import { Button } from '@/common/ui/button';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '@/lib/helper/globalConstantUtil';
import { modalStore } from '@/store';

export default function SubmitFinalScoresBtn({ competitionId, userId }) {
  const openModal = modalStore((state) => state.openModal);

  const handleClick = () => {
    const competitionObj = {
      competitionId,
      userId,
    };

    openModal({
      title: 'Confirmation',
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: ` Submit the final scores?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.SUBMIT_FINAL,
        competitionObj,
      },
    });
  };

  return (
    <div className='w-full flex items-center justify-end mt-24'>
      <Button className='w-full sm:w-[15%]' onClick={handleClick}>
        Submit Scores
      </Button>
    </div>
  );
}
