import { useEffect } from 'react';
import { headerStore } from '@/store';
import ErrorPage from './404';
import SelectFinalists from '@/features/settings/selection-finalists/SelectFinalists';
import { useGetCurrentUser } from '@/hooks/user';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);
  const currentUser = useGetCurrentUser();

  const isAllowed = currentUser.role !== 'judge';
  const pageContent = isAllowed ? (
    <SelectFinalists currentUser={currentUser} />
  ) : (
    <ErrorPage />
  );
  const pageTitle = isAllowed ? 'Settings' : 'Not Authorize';

  useEffect(() => {
    setPageTitle({ title: pageTitle });
  }, [setPageTitle, pageTitle]);

  return pageContent;
}

export default InternalPage;
