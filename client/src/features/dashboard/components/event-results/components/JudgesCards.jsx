import { useTransition, animated } from '@react-spring/web';
import { User } from 'lucide-react';

export default function JudgesCards({ judges }) {
  const sortedJudges = [...judges]?.sort((a, b) => {
    return a.judgeNumber - b.judgeNumber;
  });

  const transitions = useTransition(sortedJudges, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 500 },
    trail: 100,
  });

  return (
    <div className='mt-4 flex flex-wrap gap-2 sm:gap-4 w-full'>
      {transitions((styles, judge) => (
        <animated.div
          style={styles}
          className={`overflow-hidden flex items-center p-4 gap-2 relative w-[19%] 
          shadow-sm rounded-xl border-[1px]`}
          key={judge.value}
        >
          <figure className='bg-secondary/10 p-3 rounded-full'>
            <User className='size-5 text-primary' />
          </figure>
          <div>
            <p className='text-primary text-lg font-semibold'>
              {judge.fullName}
            </p>
            <p className='text-sm -mt-1'>{`Judge ${judge.judgeNumber}`}</p>
          </div>
        </animated.div>
      ))}
    </div>
  );
}
