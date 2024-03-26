import CardContainer from '@/containers/CardContainer';
import CardHeaderButton from '@/common/buttons/CardHeaderButton';
import { MODAL_BODY_TYPES } from '@/lib/helper/globalConstantUtil';
import { useGetAdminManagers } from '@/hooks/user';
import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import ListOfAdminAndManagers from './components/list-admin-managers/ListOfAdminAndManagers';

export default function AdminAndManagers() {
  const { isLoading, data: adminsAndManagers = [] } = useGetAdminManagers();

  console.log(adminsAndManagers);

  // Send to modal to know what user form to be displayed
  const userData = {
    userInfo: undefined,
    userType: 'admin',
  };

  const cardHeader = (
    <div className='flex items-center justify-between'>
      <h2>Admins and Event Managers</h2>
      <CardHeaderButton
        btnName='Add New User'
        title='Add New User'
        bodyType={MODAL_BODY_TYPES.USERS_ADD_NEW}
        extraObject={userData}
        className={'max-w-sm'}
      />
    </div>
  );

  return (
    <CardContainer cardHeader={cardHeader}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && adminsAndManagers.length === 0 ? (
        <p className='text-center text-foreground text-xl'>No users found</p>
      ) : (
        <ListOfAdminAndManagers
          usersEMAndAdmins={adminsAndManagers}
          userType='admin'
        />
      )}
    </CardContainer>
  );
}
