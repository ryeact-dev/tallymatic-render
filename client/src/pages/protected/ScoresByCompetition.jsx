import { useEffect } from 'react';
import { headerStore } from '@/store';
import ErrorPage from './404';
import ScoresByCompetition from '@/features/results/scores-by-competition/ScoresByCompetition';
import { useGetCurrentUser } from '@/hooks/user';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);
  const currentUser = useGetCurrentUser();

  const isAllowed = currentUser.role !== 'judge';
  const pageContent = isAllowed ? (
    <ScoresByCompetition currentUser={currentUser} />
  ) : (
    <ErrorPage />
  );
  const pageTitle = isAllowed ? 'Results By Competition' : 'Not Authorize';

  useEffect(() => {
    setPageTitle({ title: pageTitle });
  }, [setPageTitle, pageTitle]);

  return pageContent;
}

export default InternalPage;
