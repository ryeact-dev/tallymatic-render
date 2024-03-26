import { useEffect } from 'react';
import { headerStore } from '@/store';
import ErrorPage from './404';
import CompetitionSettings from '@/features/settings/competition/CompetitionSettings';
import { useGetCurrentUser } from '@/hooks/user';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);
  const currentUser = useGetCurrentUser();

  const isAllowed =
    currentUser.role === 'admin' || currentUser.role === 'event-manager';
  const pageContent = isAllowed ? <CompetitionSettings /> : <ErrorPage />;
  const pageTitle = isAllowed ? 'Settings' : 'Not Authorize';

  useEffect(() => {
    setPageTitle({ title: pageTitle });
  }, [setPageTitle, pageTitle]);

  return pageContent;
}

export default InternalPage;
