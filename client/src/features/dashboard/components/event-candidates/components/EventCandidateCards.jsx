import Image from '@/common/image/Image';
import { useTransition, animated } from '@react-spring/web';
import { CameraOff } from 'lucide-react';

export default function EventCandidateCards({ candidates }) {
  const transitions = useTransition(candidates, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 500 },
    trail: 100,
  });

  return transitions((styles, candidate) => (
    <animated.div
      style={styles}
      className={`mb-2 flex items-center p-4 gap-2 w-full 
                  shadow-sm rounded-xl border-[1px]`}
      key={candidate.value}
    >
      <figure className='bg-secondary/10 size-14 rounded-full overflow-hidden flex justify-center items-center bg-gray-800'>
        {candidate.photo ? (
          <Image photo={candidate.photo} />
        ) : (
          <p className='size-10   rounded-full flex items-center justify-center'>
            <CameraOff className='size-5 text-white' />
          </p>
        )}
      </figure>
      <div>
        <p className='text-accent text-xs font-bold uppercase'>{`Candidate ${candidate.number}`}</p>
        <p className='text-primary text-lg font-semibold  -my-1'>
          {candidate.fullName}
        </p>
        <p className='text-primary text-sm'>{candidate.course}</p>
      </div>
    </animated.div>
  ));
}
