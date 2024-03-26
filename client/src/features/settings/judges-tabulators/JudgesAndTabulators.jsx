import CardHeaderButton from '@/common/buttons/CardHeaderButton';
import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import CardContainer from '@/containers/CardContainer';
import { useGetJudgesTabulators } from '@/hooks/user';
import { MODAL_BODY_TYPES } from '@/lib/helper/globalConstantUtil';
import ListOfJudgesAndTabulators from './components/list-judges-tabulators/ListOfJudgesAndTabulators';
import NoRecordsFound from '@/common/typography/NoRecordsFound';

export default function JudgesAndTabulators() {
  const { isLoading, data: judgesAndTabulators = [] } =
    useGetJudgesTabulators();

  // Send to modal to know what user form to be displayed
  const userData = {
    userInfo: undefined,
    userType: 'judge',
  };

  const cardHeader = (
    <div className='flex items-center justify-between'>
      <h2 className='text-primary text-xl font-bold'>
        Admins and Event Managers
      </h2>
      {/* <CardHeaderButton
        btnName='Add New User'
        title='Add New User'
        bodyType={MODAL_BODY_TYPES.USERS_ADD_NEW}
        extraObject={userData}
        size={'max-w-3xl'}
      /> */}
    </div>
  );

  return (
    <CardContainer cardHeader={cardHeader}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && judgesAndTabulators.length === 0 ? (
        <NoRecordsFound>No Recors Found.</NoRecordsFound>
      ) : (
        <ListOfJudgesAndTabulators judgesAndTabulators={judgesAndTabulators} />
      )}
    </CardContainer>
  );
}
