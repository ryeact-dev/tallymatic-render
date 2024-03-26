import { useGetCurrentUser } from '@/hooks/user';
import { Navigate } from 'react-router-dom';

export default function RootContainer() {
  const currentUser = useGetCurrentUser();

  if (currentUser === null) {
    return <Navigate to='/login' replace={true} />;
  } else return <Navigate to='/app/dashboard' replace={true} />;
}
