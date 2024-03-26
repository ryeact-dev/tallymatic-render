import { useEffect } from 'react';
import { headerStore } from '@/store';
import CandidatesSettings from '@/features/settings/candidates/CandidatesSettings';
import ErrorPage from './404';
import { useGetCurrentUser } from '@/hooks/user';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);
  const currentUser = useGetCurrentUser();

  const isAllowed =
    currentUser.role === 'admin' || currentUser.role === 'event-manager';
  const pageContent = isAllowed ? <CandidatesSettings /> : <ErrorPage />;
  const pageTitle = isAllowed ? 'Settings' : 'Not Authorize';

  useEffect(() => {
    setPageTitle({ title: pageTitle });
  }, [setPageTitle, pageTitle]);

  return pageContent;
}

export default InternalPage;
