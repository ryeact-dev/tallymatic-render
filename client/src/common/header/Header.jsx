import { headerStore, modalStore } from '@/store';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '@/lib/helper/globalConstantUtil';
import MenuDrawer from '@/containers/MenuDrawer';
import { PowerIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useGetCurrentUser } from '@/hooks/user';

function Header() {
  const pageTitle = headerStore((state) => state.pageTitle);
  const openModal = modalStore((state) => state.openModal);
  const currentUser = useGetCurrentUser();

  function logoutUser() {
    openModal({
      title: 'Confirmation',
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: `Are you sure you want to logout?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.LOGOUT_USER,
      },
    });
  }

  return (
    <div className='sticky top-0 flex items-center justify-between bg-card border-b z-40 shadow-md py-1.5 px-2 mb-6'>
      <div className='flex-1'>
        <div className='flex items-center space-x-1'>
          {currentUser.role !== 'judge' ? (
            <MenuDrawer />
          ) : (
            <Button onClick={logoutUser} variant='icon' className='p-0 pl0.5'>
              <PowerIcon
                className='size-4 text-red-500 hover:text-red-700'
                strokeWidth={3}
              />
            </Button>
          )}
          <div>
            <h1 className='font-bold text-lg text-primary'>tallymatic</h1>
          </div>
        </div>
      </div>
      <div className='flex-1 text-center capitalize'>
        {currentUser.role === 'judge' ? (
          <h1 className={`text-2xl w-full font-bold text-primary`}>
            {currentUser.eventName}
          </h1>
        ) : (
          <h1 className={`text-2xl w-full font-bold text-primary `}>
            {pageTitle}
          </h1>
        )}
      </div>

      {/* Profile icon, opening menu on click */}
      <div className='flex space-x-1 items-center justify-end flex-1'>
        <div className='hidden sm:block'>
          <h1 className='text-base text-right'>
            Welcome!,{' '}
            <span className='font-semibold text-primary dark:text-accent capitalize'>
              {currentUser.fullName}
            </span>
          </h1>
          <p className='text-right text-xs -mt-1 font-medium'>
            {currentUser.role === 'judge'
              ? 'Judge no.: '
              : `${currentUser.role} : ${currentUser.eventName}`}
            <span className='font-semibold'>
              {currentUser.role === 'judge' && currentUser.judgeNumber}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
