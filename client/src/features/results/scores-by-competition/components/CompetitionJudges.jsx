import { CardContent } from '@/common/ui/card';

export default function CompetitionJudges({ judges }) {
  return (
    <CardContent className='flex items-center justify-evenly mt-16 p-0'>
      {judges?.map((judge) => (
        <div key={judge?.id} className='text-center'>
          <p className='text-sm font-bold border-b'>{judge.fullName}</p>
          <p className='text-sm'>Judge: {judge.judgeNumber}</p>
        </div>
      ))}
    </CardContent>
  );
}
