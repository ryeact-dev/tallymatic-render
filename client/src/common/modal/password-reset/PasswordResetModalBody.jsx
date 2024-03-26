import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CardContent, CardHeader, CardTitle } from '@/common/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorText from '@/common/typography/ErrorText';
import { resetPasswordSchema } from '@/lib/schema';
import { Label } from '@/common/ui/label';
import { Input } from '@/common/ui/input';
import { useResetUserPassword } from '@/hooks/user';
import { Button } from '@/common/ui/button';
import { randomPasswordGenerator } from '@/lib/helper/passwordGenerator';
import { ToastNotification } from '@/common/toast/Toast';

export default function PasswordResetModalBody({ extraObject, closeModal }) {
  const { email, id } = extraObject;

  const newPassword = useState(randomPasswordGenerator())[0];

  const passwordResetMutation = useResetUserPassword(closeModal);

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values) => {
    if (values.email !== email) {
      ToastNotification('error', 'Email does not match');
      return;
    }
    const userData = {
      id,
      newPassword,
    };
    passwordResetMutation.mutate({ userData });
  };

  return (
    <form className='-mt-4 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle className='font-normal text-center text-base'>
          Please type <span className='font-medium'>{`"${email}"`}</span> to
          proceed
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0 flex flex-col gap-6'>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='email'>Email</Label>
          <div className='space-y-1'>
            <Input {...register('email')} />
            {getFieldState('email').isTouched && errors.email && (
              <ErrorText>{errors.email.message}</ErrorText>
            )}
          </div>
        </div>
        <Label>
          New Password:{' '}
          <span className='font-medium text-accent'>{newPassword}</span>
        </Label>
        {/* <Button className={`${passwordResetMutation.isPending && 'loading'}`}>
          Submit
        </Button> */}
      </CardContent>
    </form>
  );
}
