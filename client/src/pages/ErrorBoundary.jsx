import { Card, CardContent } from '@/common/ui/card';
import { useGetCurrentUser } from '@/hooks/user';
import { Navigate, useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const currentUser = useGetCurrentUser();
  const error = useRouteError();

  if (currentUser === null) return <Navigate to='/login' replace={true} />;
  // RENDER SECTION
  return (
    <Card className='py-24'>
      <CardContent>
        <div className='flex flex-col justify-center items-center h-full '>
          <div className='flex items-center justify-center gap-2'>
            {/* <LuAlertTriangle size={24} className='text-secondary' /> */}
            <h2 className='font-medium text-2xl text-secondary'>
              Server 500 Error
            </h2>
          </div>
          <p className='my-2 t font-medium'>{error.message}</p>
          <p>
            Go back to{' '}
            <a
              href='/app/dashboard'
              className='font-medium tracking-wide text-accent'
            >
              Dashboard
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
