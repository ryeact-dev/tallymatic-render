import { useForm } from 'react-hook-form';
import { INITIAL_CANDIDATE_OBJ } from '@/lib/helper/initialValues';
import { candidateSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/common/ui/form';

import { useState } from 'react';
import { CardContent } from '@/common/ui/card';
import CandidateForm from './components/CandidateForm';
import CandidatePhoto from './components/CandidatePhoto';
import { useAddCandidate } from '@/hooks/candidate';
import { useGetCurrentUser } from '@/hooks/user';

export default function AddCandidateModalBody({
  extraObject: candidateInfo,
  closeModal,
}) {
  const currentUser = useGetCurrentUser();

  const [photoUrl, setPhotoUrl] = useState(
    candidateInfo ? candidateInfo.photo : ''
  );

  const addCandidateMutation = useAddCandidate(closeModal);

  const form = useForm({
    resolver: zodResolver(candidateSchema),
    defaultValues: candidateInfo ? candidateInfo : INITIAL_CANDIDATE_OBJ,
  });

  const onSubmit = (values) => {
    const { number, fullName, course } = values;
    const eventId = currentUser.eventId;

    const candidateObj = new FormData();
    candidateObj.append('number', number);
    candidateObj.append('fullName', fullName);
    candidateObj.append('course', course);
    candidateObj.append('photo', photoUrl);
    candidateObj.append('event', eventId);

    if (candidateInfo) {
      candidateObj.append('id', candidateInfo.id);
      addCandidateMutation.mutate({ candidateObj, isNew: false });
    } else {
      addCandidateMutation.mutate({ candidateObj, isNew: true });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className='p-0 flex items-start gap-4'>
          <CandidatePhoto photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />
          <CandidateForm
            form={form}
            loadingMutation={addCandidateMutation.isPending}
          />
        </CardContent>
      </form>
    </Form>
  );
}
