import { useTransition, animated } from '@react-spring/web';
import { aggregatedScoresheetByJudges } from '@/lib/helper/aggregatedScoresheet';
import { competitionScoresAndRanks } from '@/lib/helper/extractObjects';
import { Badge } from '@/common/ui/badge';
import { CameraOff } from 'lucide-react';
import Image from '@/common/image/Image';

export default function CandidatesCards({ scoresheet, judges }) {
  const result = aggregatedScoresheetByJudges(scoresheet, judges);
  const { candidates, judgeScores } = result;

  const rankedCandidates = competitionScoresAndRanks(judgeScores, candidates);
  rankedCandidates.sort((a, b) => a.rank - b.rank);

  const transitions = useTransition(rankedCandidates, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 500 },
    trail: 100,
  });

  return (
    <div className='mt-6 flex flex-wrap gap-2 sm:gap-4 w-full'>
      {transitions((styles, candidate) => (
        <animated.div
          style={styles}
          className={`overflow-hidden flex items-center p-4 gap-2 relative w-[24%] 
                      shadow-sm rounded-xl border-[1px]`}
          key={candidate.value}
        >
          <figure className='bg-secondary/10 size-20 rounded-full overflow-hidden'>
            {candidate.photo ? (
              <Image photo={candidate.photo} />
            ) : (
              <p className='size-10  bg-gray-800 rounded-full flex items-center justify-center'>
                <CameraOff className='size-5 text-white' />
              </p>
            )}
          </figure>
          <div>
            <p className='text-accent text-xs font-bold uppercase'>{`Candidate ${candidate.number}`}</p>
            <p className='text-primary text-lg font-semibold  -my-1'>
              {candidate.name}
            </p>
            <p className='text-primary text-sm'>{candidate.course}</p>
            <Badge>
              <p className='text-white text-xs font-semibold'>{`Rank: ${candidate.rank}`}</p>
            </Badge>
          </div>
        </animated.div>
      ))}
    </div>
  );
}
