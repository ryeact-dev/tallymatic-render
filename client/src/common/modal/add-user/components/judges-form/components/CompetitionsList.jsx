import { Button } from '@/common/ui/button';
import { CardContent } from '@/common/ui/card';
import { Label } from '@/common/ui/label';
import SelectContainer from '@/containers/SelectContainer';
import { useGetAllCompetitionsByEvent } from '@/hooks/competition';

export default function CompetitionsList({
  setCompetitions,
  competitions,
  currentUserEventId,
}) {
  const { data: listOfCompetitions = [] } =
    useGetAllCompetitionsByEvent(currentUserEventId);

  const listData = listOfCompetitions?.map((item) => {
    return {
      name: item.name,
      value: item.id,
    };
  });

  const handleAddCompetition = () => {
    setCompetitions((prevState) => [...prevState, { name: '', value: '' }]);
  };

  const handleRemoveCompetition = () => {
    setCompetitions((prevState) => prevState.slice(0, -1));
  };

  const handleChange = (values, index) => {
    const filterByName = listOfCompetitions?.filter(
      (item) => item.id === values
    );

    setCompetitions((prevState) => {
      let newArray = [...prevState];
      newArray[index] = {
        name: filterByName[0].name,
        value: filterByName[0].id,
      };
      return newArray;
    });
  };

  return (
    <>
      <div className='px-4 mt-4 flex items-center justify-between'>
        <Label>List of Competitions</Label>
        <div className='space-x-2'>
          {competitions?.length > 0 && (
            <Button
              type='button'
              size='sm'
              className='text-base font-bold'
              variant='destructive'
              onClick={handleRemoveCompetition}
            >
              -
            </Button>
          )}
          <Button
            type='button'
            size='sm'
            className='text-base font-bold'
            onClick={handleAddCompetition}
            disabled={competitions?.length >= listOfCompetitions?.length}
          >
            +
          </Button>
        </div>
      </div>
      <CardContent className='p-0 flex flex-col items-center justify-center px-4 gap-4 my-4'>
        {competitions?.map((competition, index) => (
          <SelectContainer
            key={index}
            defaultData={competition}
            data={listData}
            onValueChange={(values) => handleChange(values, index)}
            placeholder={'Select competition'}
          />
        ))}
      </CardContent>
    </>
  );
}
