import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import NoRecordsFound from '@/common/typography/NoRecordsFound';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/ui/card';
import CardContainer from '@/containers/CardContainer';
import { useGetAllCandidatesByEvent } from '@/hooks/candidate';
import { memo } from 'react';
import EventCandidateCards from './components/EventCandidateCards';

const MemoedEventCandidates = memo(function EventCandidates({ eventId }) {
  const { isLoading, data: candidates = [] } =
    useGetAllCandidatesByEvent(eventId);

  console.log('render');
  const cardHeader = (
    <CardHeader className='p-0'>
      <CardTitle className='text-lg -mb-2 text-white'>Candidates</CardTitle>
      <CardDescription className='text-white'>
        List of candidates for this event
      </CardDescription>
    </CardHeader>
  );
  return (
    <CardContainer
      cardHeader={cardHeader}
      className='w-[20%] border-none p-0 m-0'
      headerClass={'bg-accent rounded-t-xl'}
      contentClass={'p-0'}
    >
      <div className={`p-2 m-0 border-none max-h-[800px] overflow-auto`}>
        <CardContent className='p-0'>
          {isLoading ? (
            <LoadingSpinner />
          ) : !isLoading && candidates.length > 0 ? (
            <EventCandidateCards candidates={candidates} />
          ) : (
            <NoRecordsFound>No Records Found</NoRecordsFound>
          )}
        </CardContent>
      </div>
    </CardContainer>
  );
});

export default MemoedEventCandidates;
