import SelectContainer from '@/containers/SelectContainer';
import { useGetAllCompetitionsByEvent } from '@/hooks/competition';

export default function SelectCompetition({
  currentUser,
  setSearchParams,
  compId,
}) {
  const eventId = currentUser.eventId;

  const { isLoading, data: competitions = [] } =
    useGetAllCompetitionsByEvent(eventId);

  const listData = competitions?.map((item) => {
    return {
      name: item.name,
      value: item.id,
    };
  });

  const placeholder = isLoading ? 'Loading...' : 'Select Competition';
  const selectData = isLoading ? [] : listData;
  const defaultValue = compId !== '' ? { value: compId } : { value: '' };

  const handleChange = (values) => {
    const compName = listData.filter((item) => item.value === values)[0].name;

    setSearchParams(
      (prev) => {
        prev.set('compId', values);
        prev.set('name', compName);
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <SelectContainer
      className={'w-52 border-gray-300'}
      placeholder={placeholder}
      title='Competitions'
      data={selectData}
      defaultData={defaultValue}
      onValueChange={handleChange}
    />
  );
}
