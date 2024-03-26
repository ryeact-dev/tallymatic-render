import { useEffect } from 'react';
import { headerStore } from '@/store';
import Scoresheet from '@/features/scoresheet/Scoresheet';
import { useGetSingleCompetition } from '@/hooks/competition';
import { useParams } from 'react-router-dom';
import WaitingPage from '@/common/waiting-page/WaitingPage';
import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import { useGetCurrentUser } from '@/hooks/user';

function InternalPage() {
  const { id } = useParams();

  const setPageTitle = headerStore((state) => state.setPageTitle);
  const currentUser = useGetCurrentUser();

  const userId = currentUser.userId;
  const { isLoading, data: competition = [] } = useGetSingleCompetition({
    id,
    userId,
  });

  // If return true the judge is already listed in the judges list who already submitted their scores
  // const isJudgeSubmittedScores = competition?.judgesSubmitted?.includes(userId);

  const isJudgeSubmittedScores = false;

  useEffect(() => {
    setPageTitle({ title: 'Competitions' });
  }, [setPageTitle]);

  return isLoading ? (
    <LoadingSpinner />
  ) : isJudgeSubmittedScores ? (
    <WaitingPage />
  ) : (
    <Scoresheet competition={competition} />
  );
}

export default InternalPage;
