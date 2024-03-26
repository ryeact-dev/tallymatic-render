import { Input } from '@/common/ui/input';
import { Label } from '@/common/ui/label';

export default function Criteria({ setCriteria, index, criteria }) {
  const handleChange = (evt, index) => {
    const criteriaTitle = evt.target.name;
    const value = evt.target.value;

    setCriteria((prevState) => {
      let newArray = [...prevState];
      newArray[index] = { ...newArray[index], [criteriaTitle]: value };
      return newArray;
    });
  };

  return (
    <div className='flex items-start space-x-4 my-2 px-2'>
      <div className='flex-1'>
        <Label>Title</Label>
        <Input
          name='criteriaTitle'
          onChange={(evt) => handleChange(evt, index)}
          defaultValue={criteria.criteriaTitle}
          className='border-[2px] border-primary/50 shadow-xl'
        />
      </div>
      <div className='w-[20%]'>
        <Label>( % )</Label>
        <Input
          name='percent'
          type='number'
          onChange={(evt) => handleChange(evt, index)}
          defaultValue={criteria.percent}
          className='border-[2px] border-primary/50 shadow-xl'
        />
      </div>
    </div>
  );
}
