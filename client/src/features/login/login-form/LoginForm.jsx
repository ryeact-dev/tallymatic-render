import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '@/lib/schema';
import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';
import { CardContent } from '@/common/ui/card';
import { Label } from '@/common/ui/label';
import ErrorText from '@/common/typography/ErrorText';

import { useLoginUser } from '@/hooks/user';
import { INITIAL_LOGIN_OBJ } from '@/lib/helper/initialValues';

export default function LoginForm() {
  const loginUserMutation = useLoginUser();

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: INITIAL_LOGIN_OBJ,
  });

  function onSubmit(values) {
    loginUserMutation.mutate({ loginData: values });
  }

  return (
    <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
      <CardContent className='p-0 flex flex-col gap-6'>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='username'>Username</Label>
            <Input {...register('username')} className='border-gray-300' />
            {getFieldState('username').isTouched && errors.username && (
              <ErrorText>{errors.username.message}</ErrorText>
            )}
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Input {...register('password')} className='border-gray-300' />
            {getFieldState('password').isTouched && errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </div>
        </div>
        <Button type='submit'>
          {loginUserMutation.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </CardContent>
    </form>
  );
}
