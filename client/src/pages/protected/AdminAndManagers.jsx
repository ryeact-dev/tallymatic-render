import { useEffect } from 'react';
import { headerStore } from '@/store';
import ErrorPage from './404';
import AdminAndManagers from '@/features/settings/admin/AdminAndManagers';
import { useGetCurrentUser } from '@/hooks/user';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);
  const currentUser = useGetCurrentUser();

  const isAllowed = currentUser.role === 'admin';
  const pageContent = isAllowed ? <AdminAndManagers /> : <ErrorPage />;
  const pageTitle = isAllowed ? 'Settings' : 'Not Authorize';

  useEffect(() => {
    setPageTitle({ title: pageTitle });
  }, [setPageTitle, pageTitle]);

  return pageContent;
}

export default InternalPage;
