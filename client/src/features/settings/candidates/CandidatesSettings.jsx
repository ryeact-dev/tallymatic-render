import CardHeaderButton from '@/common/buttons/CardHeaderButton';
import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import CardContainer from '@/containers/CardContainer';
import { MODAL_BODY_TYPES } from '@/lib/helper/globalConstantUtil';
import NoRecordsFound from '@/common/typography/NoRecordsFound';
import ListOfCandidates from './components/list-of-candidates/ListOfCandidates';
import { useGetAllCandidatesByEvent } from '@/hooks/candidate';
import { CardDescription, CardHeader, CardTitle } from '@/common/ui/card';
import { useGetCurrentUser } from '@/hooks/user';

export default function CandidatesSettings() {
  const currentUser = useGetCurrentUser();
  const { isLoading, data: candidates = [] } = useGetAllCandidatesByEvent(
    currentUser.eventId
  );

  const modalTitle = <span className='text-primary'>New Candidate</span>;

  const cardHeader = (
    <CardHeader className='flex-row items-center justify-between p-0'>
      <div>
        <CardTitle className='text-xl text-primary font-bold -mb-1'>
          Candidates
        </CardTitle>
        <CardDescription>List of all candidates for this event</CardDescription>
      </div>
      <CardHeaderButton
        btnName='Add Candidate'
        title={modalTitle}
        bodyType={MODAL_BODY_TYPES.CANDIDATE_ADD_NEW}
        size={'max-w-xl'}
      />
    </CardHeader>
  );

  return (
    <CardContainer cardHeader={cardHeader}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && candidates.length === 0 ? (
        <NoRecordsFound>No Recors Found.</NoRecordsFound>
      ) : (
        <ListOfCandidates candidates={candidates || []} isLoading={isLoading} />
      )}
    </CardContainer>
  );
}
