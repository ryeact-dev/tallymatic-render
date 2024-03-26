import { Button } from '@/common/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/ui/form';
import { Input } from '@/common/ui/input';

export default function CandidateForm({ form, loadingMutation }) {
  return (
    <div className='flex-1 flex flex-col gap-2 justify-between h-[300px]'>
      <div className='space-y-1'>
        <FormField
          control={form.control}
          name='number'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Candidate No.</FormLabel>
              <FormControl className='!mt-0'>
                <Input {...field} className='border-gray-400' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl className='!mt-0'>
                <Input {...field} className='border-gray-400' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='course'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Info</FormLabel>
              <FormControl className='!mt-0'>
                <Input {...field} className='border-gray-400' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* <Button className='w-full !mt-8' disabled={loadingMutation}>
        {loadingMutation ? 'Saving...' : 'Save'}
      </Button> */}
    </div>
  );
}
