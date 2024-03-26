import { useEffect } from 'react';
import { headerStore } from '@/store';
import ErrorPage from './404';
import ScoresByJudge from '@/features/results/scores-by-judge/ScoresByJudge';
import { useGetCurrentUser } from '@/hooks/user';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);
  const currentUser = useGetCurrentUser();

  const isAllowed = currentUser.role !== 'judge';
  const pageContent = isAllowed ? (
    <ScoresByJudge currentUser={currentUser} />
  ) : (
    <ErrorPage />
  );
  const pageTitle = isAllowed ? 'Results By Judge' : 'Not Authorize';

  useEffect(() => {
    setPageTitle({ title: pageTitle });
  }, [setPageTitle, pageTitle]);

  return pageContent;
}

export default InternalPage;
