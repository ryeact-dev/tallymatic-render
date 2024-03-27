import { useEffect } from 'react';
import CardContainer from '@/containers/CardContainer';
import { CardDescription, CardHeader, CardTitle } from '@/common/ui/card';
import { useGetAllCompetitionsByEvent } from '@/hooks/competition';
import { useSearchParams } from 'react-router-dom';
import EventResults from './components/event-results/EventResults';
import MemoedEventCandidates from './components/event-candidates/EventCandidates';
import { useGetCurrentUser } from '@/hooks/user';

export default function Dashboard() {
  const currentUser = useGetCurrentUser();
  const eventId = currentUser.eventId;

  const [searchParams, setSearchParams] = useSearchParams({
    compId: '',
    name: '',
    eventId: '',
  });

  const compId = searchParams.get('compId');
  const name = searchParams.get('name');

  const { isLoading: isLoadingCompetitions, data: competitions = [] } =
    useGetAllCompetitionsByEvent(eventId);

  useEffect(() => {
    if (!isLoadingCompetitions && competitions.length > 0) {
      setSearchParams(
        (prev) => {
          prev.set('compId', competitions[0].id);
          prev.set('name', competitions[0].name);
          prev.set('eventId', eventId);
          return prev;
        },
        { replace: true }
      );
    }
  }, []);

  //  Dashboard - Displays the list of all events, each event can have list and
  //  view each competitions, each competition have list of judges

  return (
    <CardContainer className={'min-h-[calc(100vh-150px)]'}>
      <CardHeader className='p-0 -mt-8 mb-10 flex-row items-start justify-between'>
        <div>
          <CardTitle className='text-primary text-3xl font-bold -mb-1'>
            Hello! {currentUser.fullName}{' '}
          </CardTitle>
          <CardDescription>{`as ${currentUser.role} for ${currentUser.eventName}`}</CardDescription>
        </div>
        <div></div>
      </CardHeader>
      <div className='flex gap-6 items-start'>
        {/* Event Candidates */}
        <MemoedEventCandidates eventId={eventId} />
        {/* Event competitions results */}
        <EventResults
          compId={compId}
          name={name}
          competitions={competitions}
          setSearchParams={setSearchParams}
        />
      </div>
    </CardContainer>
  );
}
