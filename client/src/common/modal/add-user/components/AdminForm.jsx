import ErrorText from '@/common/typography/ErrorText';
import { CardContent } from '@/common/ui/card';
import { Label } from '@/common/ui/label';
import { Input } from '@/common/ui/input';
import SelectContainer from '@/containers/SelectContainer';
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
import { useGetAllEvents } from '@/hooks/event';

export default function AdminForm({ form }) {
  const userRole = form.getValues('role');

  const { data: listOfEvents = [] } = useGetAllEvents(userRole);
  const disabledSelection = userRole === 'admin';

  const usersOptions = [
    { name: 'Admin', value: 'admin' },
    { name: 'Event-Manager', value: 'event-manager' },
  ];

  return (
    <CardContent className='p-0 flex flex-col'>
      <div className='grid w-full items-center space-y-1'>
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

        <div className='flex space-x-2'>
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
                    {usersOptions.map(({ name, value }, index) => (
                      <SelectItem key={index} value={value}>
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
            control={form.control}
            name='eventId'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel
                  className={`${
                    disabledSelection ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  Event
                </FormLabel>
                <Select
                  disabled={disabledSelection}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Options' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listOfEvents?.map(({ name, value }, index) => (
                      <SelectItem key={index} value={value}>
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
      </div>
    </CardContent>
  );
}
