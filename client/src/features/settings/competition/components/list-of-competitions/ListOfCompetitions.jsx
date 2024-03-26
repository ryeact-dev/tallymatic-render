import { modalStore } from '@/store';
import { Badge } from '@/common/ui/badge';
import CompetitionOptions from './components/CompetitionOptions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '@/lib/helper/globalConstantUtil';
import JudgesSubmissionStatus from './components/JudgesSubmissionStatus';

const TABLE_HEADER = [
  { title: 'No.', className: '' },
  { title: 'Name', className: '' },
  { title: 'Criteria', className: '' },
  { title: 'Rank Multiplier', className: '' },
  { title: 'Status', className: '' },
  { title: 'Options', className: '' },
];

export default function ListOfCompetitions({ listOfCompetitions, eventId }) {
  const openModal = modalStore((state) => state.openModal);

  const onStatusUpdate = (id, status) => {
    const competitionObj = {
      id,
      status: status === 'true' ? 'false' : 'true',
      eventId,
    };

    const message = (
      <span>
        This competition status will be{' '}
        {competitionObj.status === 'true' ? (
          <span className='text-green-600 font-medium'>active</span>
        ) : (
          <span className='text-red-600 font-medium'>inactive</span>
        )}{' '}
        ?
      </span>
    );

    openModal({
      title: 'Confirmation',
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.COMPETITION_STATUS_UPDATE,
        competitionObj,
      },
    });
  };

  return (
    <>
      <JudgesSubmissionStatus listOfCompetitions={listOfCompetitions} />
      <div className='rounded-md border mt-4'>
        <Table>
          <TableHeader>
            <TableRow className='flex pt-2 bg-primary hover:bg-primary rounded-t-md '>
              {TABLE_HEADER.map((header) => {
                return (
                  <TableHead
                    key={header.title}
                    className={`${header.className} ${
                      header.title !== 'No.' && 'flex-1'
                    }  text-white px-4 -mb-2  `}
                  >
                    {header.title}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {listOfCompetitions?.map(
              (
                { id, number, name, criteria, multiplier, status, isFinalist },
                index
              ) => (
                <TableRow key={id} className='flex items-center w-full'>
                  <TableCell className='px-6'>{number}</TableCell>
                  <TableCell className='px-4 flex gap-2 items-center flex-1 text-foreground'>
                    <p className='font-bold'>{name}</p>
                    <Badge
                      variant={
                        isFinalist === 'false' ? 'highlight2' : 'highlight1'
                      }
                    >
                      {isFinalist === 'false' ? 'minor' : 'major'}
                    </Badge>
                  </TableCell>
                  <TableCell className='px-4 flex-1 italic'>
                    {criteria.map((item) => (
                      <p
                        key={item.criteriaTitle}
                      >{`${item.criteriaTitle} - ${item.percent}%`}</p>
                    ))}
                  </TableCell>
                  <TableCell className='px-4 flex-1'>{`${
                    multiplier > 0 ? `${multiplier}` : 'none'
                  }`}</TableCell>
                  <TableCell className='px-4 flex-1'>
                    <Badge
                      variant={status === 'false' ? 'secondary' : 'accent'}
                      className='hover:cursor-pointer'
                      onClick={() => onStatusUpdate(id, status)}
                    >
                      {status === 'true' ? 'active' : 'inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className='px-4 flex-1'>
                    <CompetitionOptions
                      competition={listOfCompetitions[index]}
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
