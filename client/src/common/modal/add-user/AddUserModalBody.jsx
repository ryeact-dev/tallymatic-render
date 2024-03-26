import { useState } from 'react';
import { INITIAL_USERS_OBJ } from '@/lib/helper/initialValues';
import AdminForm from './components/AdminForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/lib/schema';
import { randomPasswordGenerator } from '@/lib/helper/passwordGenerator';
import { useAddUser, useGetCurrentUser } from '@/hooks/user';
import { Label } from '@/common/ui/label';
import { Button } from '@/common/ui/button';
import { Form } from '@/common/ui/form';
import JudgesForm from './components/judges-form/JudgesForm';
import { ToastNotification } from '@/common/toast/Toast';

export default function AddUserModalBody({ extraObject, closeModal }) {
  const { userInfo, userType } = extraObject;
  const currentUser = useGetCurrentUser();

  const userPassword = useState(randomPasswordGenerator())[0];

  const [competitions, setCompetitions] = useState(
    userInfo ? userInfo.competitions : [{ value: '', name: '' }]
  );

  const addUserMutation = useAddUser(closeModal);

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: userInfo ? userInfo : INITIAL_USERS_OBJ,
  });

  const onSubmit = (values) => {
    const haveEmptyCompSelection = competitions.some(
      (item) => item.value.trim() === '' || item.name.trim() === ''
    );

    if (haveEmptyCompSelection) {
      ToastNotification(
        'error',
        'Please remove unselected competition or Atleast select 1 competition'
      );
      return;
    }

    const mutatedCompetitions = competitions.map((competition) => {
      return { id: competition.value };
    });

    const eventId =
      values.role === 'admin'
        ? ''
        : values.role === 'event-manager'
        ? values.eventId
        : currentUser.eventId;

    let userData = {
      ...values,
      eventId,
      judgeNumber: values.role === 'judge' ? values.judgeNumber : 0,
    };

    if (values.role === 'judge' || values.rol === 'tabulator') {
      userData = { ...userData, competitions: mutatedCompetitions };
    }

    if (userInfo) {
      userData = { ...userData, id: userInfo.id };
      addUserMutation.mutate({ userData, isNew: false });
    } else {
      userData = { ...userData, password: userPassword };
      addUserMutation.mutate({ userData, isNew: true });
    }
  };

  return (
    <Form {...form}>
      <form
        className='space-y-8 flex flex-col'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {userType === 'admin' ? (
          <AdminForm form={form} currentUserRole={currentUser.role} />
        ) : (
          <JudgesForm
            form={form}
            currentUserEventId={currentUser.eventId}
            competitions={competitions}
            setCompetitions={setCompetitions}
          />
        )}

        {!userInfo && (
          <Label>
            Password: <span className='font-medium'>{userPassword}</span>
          </Label>
        )}

        {/* <Button type='submit'>Submit</Button> */}
      </form>
    </Form>
  );
}
