import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';

import UserOptions from '@/common/buttons/UserOptions';

const TABLE_HEADER = [
  { title: 'Number', className: 'rounded-tl-md' },
  { title: 'Username', className: '' },
  { title: 'Name', className: '' },
  { title: 'Role', className: '' },
  { title: 'Competitions', className: '' },
  { title: 'Options', className: 'rounded-tr-md' },
];

export default function ListOfJudgesAndTabulators({ judgesAndTabulators }) {
  const sortedJudges = [...judgesAndTabulators]?.sort(
    (a, b) => a.judgeNumber - b.judgeNumber
  );

  return (
    <div className='rounded-md border mt-4'>
      <Table>
        <TableHeader className='overflow-hidden'>
          <TableRow>
            {TABLE_HEADER.map((header) => {
              return (
                <TableHead
                  key={header.title}
                  className={`${header.className} bg-primary text-white`}
                >
                  {header.title}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJudges?.map(
            (
              { id, judgeNumber, username, fullName, role, competitions },
              index
            ) => (
              <TableRow key={id}>
                <TableCell>{judgeNumber}</TableCell>
                <TableCell>{username}</TableCell>
                <TableCell>{fullName}</TableCell>
                <TableCell>{role}</TableCell>
                <TableCell>
                  <div className='flex flex-wrap gap-1'>
                    {competitions
                      ? competitions.map((competition) => (
                          <p
                            key={competition.value}
                          >{`${competition.name}, `}</p>
                        ))
                      : 'Not set'}
                  </div>
                </TableCell>
                <TableCell className='space-x-2'>
                  <UserOptions
                    userData={sortedJudges[index]}
                    userType='judge'
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
