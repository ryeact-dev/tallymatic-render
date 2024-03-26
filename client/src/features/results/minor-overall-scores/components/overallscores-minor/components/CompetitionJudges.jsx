import { CardContent } from '@/common/ui/card';
import { extractJudges } from '@/lib/helper/extractObjects';

export default function CompetitionJudges({ competitions }) {
  const judges = extractJudges(competitions);

  return (
    <CardContent className='flex items-center justify-evenly mt-16 p-0'>
      {judges?.map((judge) => (
        <div key={judge?.id} className='text-center'>
          <p className='text-sm font-bold border-b'>{judge.name}</p>
          <p className='text-sm'>Judge: {judge.number}</p>
        </div>
      ))}
    </CardContent>
  );
}
