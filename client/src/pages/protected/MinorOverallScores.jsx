import { useEffect } from 'react';
import { headerStore } from '@/store';
import ErrorPage from './404';
import MinorOverallScores from '@/features/results/minor-overall-scores/MinorOverallScoress';
import { useGetCurrentUser } from '@/hooks/user';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);
  const currentUser = useGetCurrentUser();

  const isAllowed = currentUser.role !== 'judge';
  const pageContent = isAllowed ? (
    <MinorOverallScores currentUser={currentUser} />
  ) : (
    <ErrorPage />
  );
  const pageTitle = isAllowed ? 'Results' : 'Not Authorize';

  useEffect(() => {
    setPageTitle({ title: pageTitle });
  }, [setPageTitle, pageTitle]);

  return pageContent;
}

export default InternalPage;
