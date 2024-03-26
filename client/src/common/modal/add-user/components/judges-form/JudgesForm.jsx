import { Card, CardContent } from '@/common/ui/card';
import { Input } from '@/common/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/ui/select';
import CompetitionsList from './components/CompetitionsList';

export default function JudgesForm({
  form,
  currentUserEventId,
  competitions,
  setCompetitions,
}) {
  const userRole = form.getValues('role');
  const disabledSelection = userRole === 'tabulator' || userRole === '';

  const usersOptions = [
    { name: 'Tabulator', value: 'tabulator' },
    { name: 'Judge', value: 'judge' },
  ];

  return (
    <CardContent className='p-0 flex items-start gap-8'>
      <div className='w-full items-center space-y-1 flex-1'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex space-x-4'>
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={form.watch('role')}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Options' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {usersOptions.map(({ name, value }) => (
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

          <FormField
            disabled={disabledSelection}
            control={form.control}
            name='judgeNumber'
            render={({ field }) => (
              <FormItem
                className={`${
                  disabledSelection ? 'opacity-50' : 'opacity-100'
                } flex-1`}
              >
                <FormLabel>Judge No.</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <Card className='border-dashed border flex-1'>
        <CompetitionsList
          setCompetitions={setCompetitions}
          competitions={competitions}
          currentUserEventId={currentUserEventId}
        />
      </Card>
    </CardContent>
  );
}
