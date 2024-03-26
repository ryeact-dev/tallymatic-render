import CardHeaderButton from '@/common/buttons/CardHeaderButton';
import CardContainer from '@/containers/CardContainer';
import { MODAL_BODY_TYPES } from '@/lib/helper/globalConstantUtil';
import { useGetAllCompetitionsByEvent } from '@/hooks/competition';
import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import NoRecordsFound from '@/common/typography/NoRecordsFound';
import ListOfCompetitions from './components/list-of-competitions/ListOfCompetitions';
import { CardDescription, CardTitle } from '@/common/ui/card';
import { useGetCurrentUser } from '@/hooks/user';

export default function CompetitionSettings() {
  const currentUser = useGetCurrentUser();

  const { isLoading, data: listOfCompetitions = [] } =
    useGetAllCompetitionsByEvent(currentUser.eventId, true);

  const modalTitle = <p className='text-primary'>Add Competition</p>;

  const cardHeader = (
    <div className='flex items-center justify-between'>
      <div>
        <CardTitle className='text-xl text-secondary font-bold -mb-1'>
          Competitions
        </CardTitle>
        <CardDescription>
          List of all competitions for this event
        </CardDescription>
      </div>
      <CardHeaderButton
        btnName='Add Competition'
        title={modalTitle}
        bodyType={MODAL_BODY_TYPES.COMPETITION_ADD_NEW}
        size={'max-w-sm'}
      />
    </div>
  );

  return (
    <CardContainer cardHeader={cardHeader}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && listOfCompetitions.length === 0 ? (
        <NoRecordsFound>No Recors Found.</NoRecordsFound>
      ) : (
        <ListOfCompetitions
          listOfCompetitions={listOfCompetitions}
          eventId={currentUser.eventId}
        />
      )}
    </CardContainer>
  );
}
