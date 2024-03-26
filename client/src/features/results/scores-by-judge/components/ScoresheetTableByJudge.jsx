import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';

const TABLE_HEADER = [
  { title: 'No.', className: 'w-14 text-center' },
  { title: 'Name', className: '' },
  { title: 'Course', className: '' },
  { title: 'Scores', className: 'text-center !pt-2' },
  { title: 'Total', className: 'text-center' },
  { title: 'Rank', className: 'text-center' },
];

export default function ScoresheetTableByJudge({ scoresheet, criteria }) {
  return (
    <div className='rounded-lg border mt-4 overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow className='flex pt-4 -mt-4 bg-primary hover:bg-primary'>
            {TABLE_HEADER.map((header) => {
              return (
                <TableHead
                  key={header.title}
                  className={`${header.className} ${
                    header.title !== 'No.' && 'flex-1'
                  } text-white font-bold pt-4 h-14`}
                >
                  {header.title}
                  {header.title === 'Scores' && (
                    <div className='flex gap-2 items-center justify-center'>
                      {criteria.map((item) => (
                        <p className='w-36 text-xs' key={item.criteriaTitle}>
                          {item.criteriaTitle}
                        </p>
                      ))}
                    </div>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {scoresheet
            ?.sort((a, b) => a.candidate.number - b.candidate.number)
            .map(({ id, candidate, scores, total, rank }) => (
              <TableRow key={id} className='flex items-center w-full'>
                <TableCell className='w-14 text-center '>
                  {candidate.number}
                </TableCell>
                <TableCell className='flex-1'>{candidate.fullName}</TableCell>
                <TableCell className='flex-1'>{candidate.course}</TableCell>
                <TableCell className='flex-1 flex gap-2 justify-center text-center'>
                  {scores.map((item, index) => (
                    <p key={index} className='w-36'>
                      {item.score}
                    </p>
                  ))}
                </TableCell>
                <TableCell className='flex-1 text-center'>{total}</TableCell>
                <TableCell className='flex-1 text-center text-accent font-bold'>
                  {rank}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
