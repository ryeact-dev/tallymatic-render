import { useEffect } from 'react';
import { headerStore } from '@/store';
import WaitingPage from '@/common/waiting-page/WaitingPage';
import Dashboard from '@/features/dashboard/Dashboard';
import { useGetCurrentUser } from '@/hooks/user';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);
  const currentUser = useGetCurrentUser();

  const page = currentUser.role === 'judge' ? <WaitingPage /> : <Dashboard />;

  useEffect(() => {
    setPageTitle({ title: 'Dashboard' });
  }, [setPageTitle]);

  return page;
}

export default InternalPage;
