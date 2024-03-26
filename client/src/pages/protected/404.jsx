import { useEffect } from 'react';
import { headerStore } from '@/store';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/common/ui/card';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: 'Not Authorize' });
  }, [setPageTitle]);

  return (
    <Card className='mx-4 py-20'>
      <CardContent>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-center text-red-500'>
            <div className='max-w-md'>
              {/* <FaceFrownIcon className='inline-block h-48 w-48' /> */}
              <h1 className='text-5xl font-bold'>404 - Not Found</h1>
              <p className='text-xl text-foreground'>
                Go back to{' '}
                <Link
                  to='/app/dashboard'
                  className='font-medium dark:text-accent text-primary'
                >
                  Dashboard
                </Link>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InternalPage;
