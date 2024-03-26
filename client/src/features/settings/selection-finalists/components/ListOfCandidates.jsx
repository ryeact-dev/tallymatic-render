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
import CardContainer from '@/containers/CardContainer';
import { useAddFinalist } from '@/hooks/competition';

export default function ListOfCandidates({
  selectComp,
  isLoading,
  candidates,
}) {
  const addFinalistMutation = useAddFinalist();

  const cardHeader = (
    <CardHeader className='p-0 text-white'>
      <CardTitle className='-mb-1'>Candidates</CardTitle>
      <CardDescription className='text-white font-thin'>
        List of all candidates for this event
      </CardDescription>
    </CardHeader>
  );

  const handleClick = (candidateId) => {
    if (!selectComp) {
      ToastNotification('error', 'Please select a competition first');
      return;
    }

    if (selectComp.finalists.includes(candidateId)) {
      ToastNotification('error', 'Candidate already added');
      return;
    }

    const competitionObj = {
      candidateId,
      id: selectComp.id,
    };

    addFinalistMutation.mutate({ competitionObj });
  };

  return (
    <CardContainer
      cardHeader={cardHeader}
      className={'flex-1 border-none'}
      headerClass={'bg-primary rounded-t-lg'}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : !isLoading && candidates.length === 0 ? (
        <NoRecordsFound>No Records Found</NoRecordsFound>
      ) : (
        <CardContent className='p-0'>
          {candidates.map((candidate, index) => (
            <div
              key={candidate.id}
              className='my-3 flex items-center justify-between'
            >
              <div className='flex gap-3 items-center'>
                <p className='text-muted-foreground w-4'>{candidate.number}</p>
                <figure>
                  <img
                    className='size-10 object-cover rounded-full object-center'
                    src={import.meta.env.VITE_API_URL + candidate.photo}
                    alt='candidatePhoto'
                  />
                </figure>
                <div>
                  <p className='text-lg -mb-1 font-semibold'>
                    {candidate.fullName}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {candidate.course}
                  </p>
                </div>
              </div>
              <div>
                <Button
                  size='sm'
                  onClick={() => handleClick(candidate.id)}
                  className='text-xl font-bold px-2.5'
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </CardContainer>
  );
}
