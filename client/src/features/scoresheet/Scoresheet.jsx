import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import CardContainer from '@/containers/CardContainer';
import NoRecordsFound from '@/common/typography/NoRecordsFound';
import { useGetAllCandidatesByEvent } from '@/hooks/candidate';
import CardsOfCandidates from './components/CardsOfCandidates';
import { Label } from '@/common/ui/label';
import { useGetCurrentUser } from '@/hooks/user';

export default function Scoresheet({ competition }) {
  const currentUser = useGetCurrentUser();

  const { isLoading, data: candidates = [] } = useGetAllCandidatesByEvent(
    currentUser.eventId
  );

  const cardHeader = (
    <div className='flex flex-col items-center'>
      <Label className='text-3xl font-bold text-accent'>
        {competition.name}
      </Label>
      <Label className='text-base font-semibold text-gray-700'>
        {competition.isFinalist === 'true'
          ? 'Major Competition'
          : 'Minor Competition'}
      </Label>
    </div>
  );
  return (
    <CardContainer cardHeader={cardHeader}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && candidates.length === 0 ? (
        <NoRecordsFound>No Recors Found.</NoRecordsFound>
      ) : (
        <CardsOfCandidates
          competition={competition}
          candidates={candidates || []}
          isLoading={isLoading}
          currentUser={currentUser}
        />
      )}
    </CardContainer>
  );
}
