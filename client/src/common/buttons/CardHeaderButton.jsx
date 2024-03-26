import { modalStore } from '@/store';
import { Button } from '../ui/button';

export default function CardHeaderButton({
  title,
  bodyType,
  btnName,
  extraObject,
  size,
}) {
  const openModal = modalStore((state) => state.openModal);

  const openAddNewModal = () => {
    openModal({
      title,
      bodyType,
      extraObject,
      size,
    });
  };

  return (
    <>
      <Button
        className='px-6 normal-case font-semibold'
        variant='secondary'
        onClick={openAddNewModal}
      >
        {btnName ? btnName : 'Add New'}
      </Button>
    </>
  );
}
