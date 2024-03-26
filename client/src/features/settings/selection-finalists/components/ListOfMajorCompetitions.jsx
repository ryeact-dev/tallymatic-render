import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import { ToastNotification } from '@/common/toast/Toast';
import NoRecordsFound from '@/common/typography/NoRecordsFound';
import { Button } from '@/common/ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/ui/card';
import { Checkbox } from '@/common/ui/checkbox';

import CardContainer from '@/containers/CardContainer';
import {
  useGetAllCompetitionsByEvent,
  useRemoveFinalist,
} from '@/hooks/competition';

export default function ListOfMajorCompetitions({
  currentUser,
  setSelectedComp,
  selectComp,
  candidates,
  isLoadingCandidates,
}) {
  const eventId = currentUser.eventId;

  const { isLoading, data: majorCompetitions = [] } =
    useGetAllCompetitionsByEvent(eventId);

  const removeFinalistMutation = useRemoveFinalist();

  const cardHeader = (
    <CardHeader className='p-0 text-white'>
      <CardTitle className='-mb-1'>Competitions</CardTitle>
      <CardDescription className='text-white font-thin'>
        List of all Major Competitions for this event
      </CardDescription>
    </CardHeader>
  );

  const handleChange = (value, competition) => {
    if (value) {
      setSelectedComp({
        id: competition.id,
        finalists: competition.finalistList,
      });
    } else {
      setSelectedComp(null);
    }
  };

  const handleClick = (candidateId, compId) => {
    if (!selectComp) {
      ToastNotification('error', 'Please select a competition first');
      return;
    }

    if (selectComp.id !== compId) {
      ToastNotification('error', 'Please select the correct competition');
      return;
    }

    const competitionObj = {
      candidateId,
      id: selectComp.id,
    };

    removeFinalistMutation.mutate({ competitionObj });
  };

  return (
    <CardContainer
      cardHeader={cardHeader}
      className={'flex-[2] bg-background border-none'}
      headerClass={'bg-accent rounded-t-lg'}
    >
      {isLoading || isLoadingCandidates ? (
        <LoadingSpinner />
      ) : !isLoading && majorCompetitions.length === 0 ? (
        <NoRecordsFound>No Records Found</NoRecordsFound>
      ) : (
        <div className='flex flex-wrap'>
          {majorCompetitions.map((competition) => {
            const cardHeader = (
              <CardHeader className='p-0 flex-row items-center gap-2'>
                <Checkbox
                  className='size-5 border-white'
                  checked={selectComp?.id === competition.id}
                  onCheckedChange={(value) => handleChange(value, competition)}
                />
                <CardTitle className='!mt-0 text-white'>
                  {competition.name}
                </CardTitle>
              </CardHeader>
            );
            return (
              competition.isFinalist === 'true' && (
                <CardContainer
                  cardHeader={cardHeader}
                  key={competition.id}
                  headerClass={'bg-blue-600 rounded-t-lg'}
                  className={'border-none flex-1'}
                >
                  <CardContent className='p-0'>
                    {competition.finalistList.length === 0 ? (
                      <NoRecordsFound>Please select a finalist</NoRecordsFound>
                    ) : (
                      competition.finalistList.map((candidate, index) => {
                        const foundIndex = candidates?.findIndex(
                          (item) => item.id === candidate
                        );
                        return (
                          foundIndex > -1 && (
                            <div
                              key={candidates[foundIndex]?.id}
                              className='my-3 flex items-center justify-between'
                            >
                              <div className='flex gap-3 items-center'>
                                <p className='text-muted-foreground w-4'>
                                  {candidates[foundIndex]?.number}
                                </p>
                                <figure>
                                  <img
                                    className='size-10 object-cover rounded-full object-center'
                                    src={
                                      import.meta.env.VITE_API_URL +
                                      candidates[foundIndex]?.photo
                                    }
                                    alt='candidatePhoto'
                                  />
                                </figure>
                                <div>
                                  <p className='text-lg -mb-1 font-semibold'>
                                    {candidates[foundIndex]?.fullName}
                                  </p>
                                  <p className='text-sm text-muted-foreground'>
                                    {candidates[foundIndex]?.course}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <Button
                                  variant='destructive'
                                  className='text-xl font-bold'
                                  size='sm'
                                  onClick={() =>
                                    handleClick(
                                      candidates[foundIndex].id,
                                      competition.id
                                    )
                                  }
                                >
                                  -
                                </Button>
                              </div>
                            </div>
                          )
                        );
                      })
                    )}
                  </CardContent>
                </CardContainer>
              )
            );
          })}
        </div>
      )}
    </CardContainer>
  );
}
