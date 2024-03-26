import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';
import CandidateOptions from './components/CandidateOptions';
import { CameraOff } from 'lucide-react';
import Image from '@/common/image/Image';

const TABLE_HEADER = [
  { title: 'No.', className: 'rounded-tl-md' },
  { title: 'Candidate', className: '' },
  { title: 'Additional Info', className: '' },
  { title: 'Options', className: 'rounded-tr-md' },
];

export default function ListOfCandidates({ candidates }) {
  return (
    <div className='rounded-md border mt-4'>
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_HEADER.map((header) => {
              return (
                <TableHead
                  key={header.title}
                  className={`${header.className} text-white bg-primary`}
                >
                  {header.title}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map(
            ({ id, number, photo, fullName, course, competitions }, index) => (
              <TableRow key={id}>
                <TableCell>{number}</TableCell>
                <TableCell className='flex items-center gap-2'>
                  {photo ? (
                    <Image photo={photo} className={'size-10 rounded-full'} />
                  ) : (
                    <p className='size-10  bg-gray-800 rounded-full flex items-center justify-center'>
                      <CameraOff className='size-5 text-white' />
                    </p>
                  )}
                  <p className='text-base'>{fullName}</p>
                </TableCell>
                <TableCell>{course}</TableCell>
                {/* <TableCell className='flex flex-wrap gap-1'>
                  {competitions
                    ? competitions.map((competition) => (
                        <p key={competition.id}>{`${competition.name}, `}</p>
                      ))
                    : 'Not set'}
                </TableCell> */}
                <TableCell className='space-x-2'>
                  <CandidateOptions candidateData={candidates[index]} />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
