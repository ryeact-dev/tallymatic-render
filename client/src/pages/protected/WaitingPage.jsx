import { useEffect } from 'react';
import { headerStore } from '@/store';
import WaitingPage from '@/common/waiting-page/WaitingPage';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: 'Waiting Page' });
  }, [setPageTitle]);

  return <WaitingPage />;
}

export default InternalPage;
