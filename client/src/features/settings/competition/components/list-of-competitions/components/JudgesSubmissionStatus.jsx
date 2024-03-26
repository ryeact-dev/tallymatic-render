import { Badge } from '@/common/ui/badge';
import { CardContent } from '@/common/ui/card';
import CardContainer from '@/containers/CardContainer';

export default function JudgesSubmissionStatus({ listOfCompetitions }) {
  const activeCompetition = listOfCompetitions.filter(
    (competition) => competition.status === 'true'
  );

  const currentJudges = activeCompetition[0]?.users.sort(
    (a, b) => a.judgeNumber - b.judgeNumber
  );

  return (
    <div className={'p-2 mt-6 rounded-md border-[1.5px] border-gray-200'}>
      <CardContent className='z-10 m-0 p-0 flex items-center justify-evenly'>
        {currentJudges?.map(({ judgeNumber, isLock, id }) => (
          <Badge
            key={id}
            className={`flex items-center gap-1 font-normal px-4 text-white ${
              isLock === 'true'
                ? 'bg-green-600 hover:bg-green-600'
                : 'bg-red-600 hover:bg-red-600'
            }`}
          >
            <p className='text-sm'>{`Judge: ${judgeNumber} -`}</p>
            <p className='text-sm'>{`${
              isLock === 'true' ? 'submitted' : 'no submission'
            }`}</p>
          </Badge>
        ))}
      </CardContent>
    </div>
  );
}
