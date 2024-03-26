import Image from '@/common/image/Image';
import { Icon } from '@iconify-icon/react';

export default function ScoresheetPhoto({ candidateInfo, totalScore }) {
  return (
    <div className='w-[45%] relative size-auto items-center rounded-2xl shadow-lg'>
      <div className='absolute bottom-1 right-1 bg-accent/90 border-accent border-2 backdrop-blur-xl p-1 rounded-md w-28 flex items-center justify-center '>
        <p className='text-white text-3xl font-semibold -mt-1'>
          {totalScore === 'NaN' ? '0' : totalScore}
        </p>
      </div>
      {candidateInfo.photo ? (
        <Image
          photo={candidateInfo.photo}
          className={'w-full h-80 rounded-lg'}
        />
      ) : (
        <div className='h-72 w-full flex items-center justify-center'>
          <Icon icon='line-md:image-twotone' width='100' height='100' />
        </div>
      )}
    </div>
  );
}
