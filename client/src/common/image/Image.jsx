import { cn } from '@/lib/utils/shadcn';

export default function Image({ photo, className }) {
  return (
    <div className={cn('w-full h-full overflow-hidden', className)}>
      <img
        src={import.meta.env.VITE_LOCAL_BASE_URL + photo || ''}
        className='w-full h-full object-cover object-center'
        alt='candidatephoto'
        loading='lazy'
      />
    </div>
  );
}
