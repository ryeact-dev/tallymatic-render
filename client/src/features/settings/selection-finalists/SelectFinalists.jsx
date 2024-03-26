import CardContainer from '@/containers/CardContainer';

import { useSearchParams } from 'react-router-dom';
import ListOfCandidates from './components/ListOfCandidates';
import ListOfMajorCompetitions from './components/ListOfMajorCompetitions';
import { useState } from 'react';
import { useGetAllCandidatesByEventWithMajorComp } from '@/hooks/candidate';
import { CardDescription, CardHeader, CardTitle } from '@/common/ui/card';

export default function SelectFinalists({ currentUser }) {
  const eventId = currentUser.eventId;
  const [searchParams, setSearchParams] = useSearchParams({
    compId: '',
  });
  const compId = searchParams.get('compId');
  const [selectComp, setSelectedComp] = useState(null);

  const { isLoading, data: candidates = [] } =
    useGetAllCandidatesByEventWithMajorComp(eventId);

  const cardHeader = (
    <CardHeader className='p-0'>
      <CardTitle className='-mb-2 text-xl text-primary font-bold'>
        Selection of Finalists
      </CardTitle>
      <CardDescription>
        Settings for selecting finalists for each major competition
      </CardDescription>
    </CardHeader>
  );

  return (
    <CardContainer cardHeader={cardHeader}>
      <div className='flex gap-2 items-start'>
        <ListOfCandidates
          currentUser={currentUser}
          selectComp={selectComp}
          isLoading={isLoading}
          candidates={candidates}
        />

        <ListOfMajorCompetitions
          candidates={candidates}
          currentUser={currentUser}
          selectComp={selectComp}
          isLoadingCandidates={isLoading}
          setSelectedComp={setSelectedComp}
        />
      </div>
    </CardContainer>
  );
}
