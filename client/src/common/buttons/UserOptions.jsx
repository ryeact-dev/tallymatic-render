import { modalStore } from '@/store';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '@/lib/helper/globalConstantUtil';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/common/ui/dropdown-menu';
import { Button } from '@/common/ui/button';
import { PenBox, Trash } from 'lucide-react';
import TooltipContainer from '../tooltip-container/TooltipContainer';

export default function UserOptions({ userData, userType }) {
  const openModal = modalStore((state) => state.openModal);

  function deleteUser(id) {
    openModal({
      title: 'Confirmation',
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: `Remove this user?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.USERS_DELETE,
        id,
      },
    });
  }

  // Reset user's password
  function passwordReset(user) {
    const userInfo = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };

    openModal({
      title: 'Reset Password',
      bodyType: MODAL_BODY_TYPES.RESET_PASSWORD,
      extraObject: userInfo,
    });
  }

  // Edit user
  function editUser(userInfo) {
    openModal({
      title: 'Update User',
      bodyType: MODAL_BODY_TYPES.USERS_ADD_NEW,
      extraObject: { userInfo, userType },
      size: 'max-w-3xl',
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Fix Tooltip container */}
          <Button variant='ghost' className='h-8 w-8 p-0 hover:bg-primary'>
            <span className='sr-only'>Open menu</span>
            <PenBox className='w-5 h-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem className='px-4' onClick={() => editUser(userData)}>
            Update User
          </DropdownMenuItem>
          <DropdownMenuItem
            className='px-4'
            onClick={() => passwordReset(userData)}
          >
            Reset password
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <TooltipContainer content='Delete' className={'bg-destructive'}>
        <Button
          onClick={() => deleteUser(userData.id)}
          variant='ghost'
          className='h-8 w-8 p-0 hover:bg-destructive'
        >
          <Trash className='w-5 h-5' />
        </Button>
      </TooltipContainer> */}
    </>
  );
}
