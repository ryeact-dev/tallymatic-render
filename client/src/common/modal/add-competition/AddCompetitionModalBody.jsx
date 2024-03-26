import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { competitionSchema } from '@/lib/schema';
import { INITIAL_COMP_OBJ } from '@/lib/helper/initialValues';
import { Form } from '@/common/ui/form';
import FormContent from './components/form-content/FormContent';
import { ToastNotification } from '@/common/toast/Toast';
import { useAddCompetition } from '@/hooks/competition';
import { useGetCurrentUser } from '@/hooks/user';

export default function AddCompetitionModalBody({
  extraObject: compInfo,
  closeModal,
}) {
  const currentUser = useGetCurrentUser();

  const [criteria, setCriteria] = useState(
    compInfo
      ? compInfo.criteria
      : [{ criteriaTitle: '', percent: '', score: 0 }]
  );

  const addNewCompetitionMutation = useAddCompetition(closeModal);

  const form = useForm({
    resolver: zodResolver(competitionSchema),
    defaultValues: compInfo ? compInfo : INITIAL_COMP_OBJ,
  });

  const onSubmit = (values) => {
    const blankCriteria = criteria.some(
      (item) => !item.criteriaTitle.trim() || !item.percent.trim()
    );
    if (blankCriteria) {
      ToastNotification('error', 'Title & Percentage fields are required!');
      return;
    }

    const totalPercentage = criteria.reduce(
      (total, item) => total + Number(item.percent),
      0
    );
    if (totalPercentage !== 100) {
      ToastNotification('error', 'Criteria must have an exact total of 100%');
      return;
    }

    let newCompetitionObj = {
      ...values,
      criteria,
      eventId: currentUser.eventId,
    };

    if (compInfo) {
      newCompetitionObj = { ...newCompetitionObj, id: compInfo.id };
      addNewCompetitionMutation.mutate({ newCompetitionObj, isNew: false });
    } else {
      addNewCompetitionMutation.mutate({ newCompetitionObj, isNew: true });
    }
  };

  return (
    <Form {...form}>
      <form
        className='space-y-8 flex flex-col'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormContent
          form={form}
          criteria={criteria}
          setCriteria={setCriteria}
        />
      </form>
    </Form>
  );
}
