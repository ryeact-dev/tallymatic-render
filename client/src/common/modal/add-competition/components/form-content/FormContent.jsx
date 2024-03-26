import { Button } from '@/common/ui/button';
import { Card, CardContent } from '@/common/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/ui/select';
import { Label } from '@/common/ui/label';
import Criteria from './components/Criteria';
import { IS_FINALIST_OBJ } from '@/lib/helper/initialValues';

export default function FormContent({ form, criteria, setCriteria }) {
  const isFinals = form.watch('isFinalist');

  const handleAddCriteria = () => {
    setCriteria((prevState) => [
      ...prevState,
      { criteriaTitle: '', percent: '', score: 0 },
    ]);
  };

  const removeCriteria = () => {
    setCriteria((prevState) => prevState.slice(0, -1));
  };

  return (
    <CardContent className='p-0 flex flex-col gap-6'>
      <div className='w-full items-center space-y-1'>
        <div className='flex w-full space-x-4'>
          <FormField
            control={form.control}
            name='number'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='border-[2px] border-primary/50 shadow-xl'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='isFinalist'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>For finals?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='border-[2px] border-primary/50 shadow-xl'>
                    <SelectTrigger>
                      <SelectValue placeholder='Options' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {IS_FINALIST_OBJ.map(({ name, value }) => (
                      <SelectItem key={value} value={value}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col space-y-1.5 flex-1'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='border-[2px] border-primary/50 shadow-xl'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='!mt-3 !mb-1'>
          <div className='flex justify-between items-center mb-2'>
            <Label>Criteria</Label>

            <div className='space-x-2'>
              {criteria.length > 1 && (
                <Button
                  type='button'
                  size='sm'
                  className='text-base font-bold'
                  variant='destructive'
                  onClick={removeCriteria}
                >
                  -
                </Button>
              )}
              <Button
                type='button'
                size='sm'
                className='text-base font-bold'
                onClick={handleAddCriteria}
              >
                +
              </Button>
            </div>
          </div>
          <Card className='p-2 rounded-md border-dashed border-[1px] border-primary'>
            {criteria.map((item, index) => (
              <Criteria
                key={index}
                index={index}
                setCriteria={setCriteria}
                criteria={item}
              />
            ))}
          </Card>
        </div>

        <div className='flex space-x-2 items-start'>
          <div className='flex-1'>
            <FormField
              disabled={isFinals === 'true' ? true : false}
              control={form.control}
              name='multiplier'
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`${
                      isFinals === 'true' ? 'opacity-30' : 'opacity-100'
                    }`}
                  >
                    Rank Multiplier
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='border-[2px] border-primary/50 shadow-xl'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex-1'>
            <FormField
              disabled={isFinals === 'true' ? false : true}
              control={form.control}
              name='finalists'
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`${
                      isFinals === 'false' ? 'opacity-30' : 'opacity-100'
                    }`}
                  >
                    How many finalists?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='border-[2px] border-primary/50 shadow-xl'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
      {/* <Button className='w-full'>Submit</Button> */}
    </CardContent>
  );
}
