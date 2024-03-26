import SelectContainer from '@/containers/SelectContainer';
import { useGetJudgesTabulators } from '@/hooks/user';

export default function SelectJudge({ setSearchParams, compId, userId }) {
  const { isLoading, data: judges = [] } = useGetJudgesTabulators();

  const currentJudges =
    (!isLoading &&
      judges.length > 0 &&
      judges
        .map((user) => {
          // Search for judges belongs to this competition
          const result = user.competitions.some(
            (comp) => comp.value === compId
          );
          if (result)
            return {
              value: user.id,
              name: user.fullName,
              number: user.judgeNumber,
            };
        })
        .filter((judge) => judge !== undefined)) ||
    [];

  currentJudges.length > 0 && currentJudges.sort((a, b) => a.number - b.number);

  const handleChange = (values) => {
    setSearchParams(
      (prev) => {
        prev.set('userId', values);
        return prev;
      },
      { replace: true }
    );
  };

  const placeholder = isLoading ? 'Loading...' : 'Select Judge';
  const selectData = isLoading ? [] : currentJudges;
  const defaultValue = userId !== '' ? { value: userId } : { value: '' };

  return (
    <div>
      <SelectContainer
        className={'w-52 border-gray-300'}
        data={selectData}
        placeholder={placeholder}
        onValueChange={handleChange}
        title={'Judges'}
        defaultData={defaultValue}
      />
    </div>
  );
}
