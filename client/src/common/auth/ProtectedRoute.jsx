import { useGetCurrentUser } from '@/hooks/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const currentUser = useGetCurrentUser();
  const navigate = useNavigate();

  console.log(currentUser);

  useEffect(() => {
    if (currentUser === null) {
      navigate('/login', { replace: true });
    }
  }, [currentUser, navigate]);

  return children;
}
