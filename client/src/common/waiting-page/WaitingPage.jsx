import { useNavigate } from 'react-router-dom';
import { useGetActiveCompetition } from '@/hooks/competition';
import CardContainer from '@/containers/CardContainer';
import { Icon } from '@iconify-icon/react';
import { useEffect, useState } from 'react';
import { useGetCurrentUser, useGetJudgesStatus } from '@/hooks/user';

function WaitingPage() {
  const navigate = useNavigate();
  const currentUser = useGetCurrentUser();

  // A fetch trigger for judgeStatus
  const fetchTrigger = useState(Math.random())[0];

  const eventId = currentUser?.eventId;
  const userRole = currentUser?.role;
  const userId = currentUser?.userId;

  const { data: judgeStatus } = useGetJudgesStatus({
    userId,
    fetchTrigger,
    userRole,
  });

  const { isLoading, data: activeCompetition = [] } = useGetActiveCompetition({
    eventId,
    userRole,
  });

  useEffect(() => {
    if (!isLoading & (activeCompetition.length > 0)) {
      const isUserBelongToThisComp = currentUser.listOfCompetitions.includes(
        activeCompetition[0].id
      );

      if (judgeStatus?.isLock === 'false' && isUserBelongToThisComp) {
        navigate(`/app/competitions/${activeCompetition[0].id}`, {
          replace: true,
        });
      }
    }
  }, [
    isLoading,
    activeCompetition,
    judgeStatus?.isLock,
    navigate,
    currentUser.listOfCompetitions,
  ]);

  return (
    <CardContainer className='py-24'>
      <div className='max-w-2xl flex flex-col items-center justify-center gap-4 text-center mx-auto'>
        <Icon
          icon='line-md:confirm-circle'
          width={200}
          style={{ color: 'green' }}
        />
        <h1 className='text-secondary text-4xl leading-tight font-bold'>
          Your final scores was successfully submitted.
        </h1>
        <p className='text-xl font-medium'>
          Kindly wait for the other judges to submit their final scores.
        </p>
        <p className='text-sm w-[90%] italic'>
          The next competition will be open once all judges have submitted their
          scores.
        </p>
      </div>
    </CardContainer>
  );
}

export default WaitingPage;
