import { Suspense } from 'react';
import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import { TabsContent, TabsList, TabsTrigger } from '@/common/ui/tabs';
import { useGetCompetitionScoresheetByCompetition } from '@/hooks/scoresheet';
import { Tabs } from '@radix-ui/react-tabs';
import CandidatesCards from './components/CandidatesCards';
import JudgesCards from './components/JudgesCards';
import { CardDescription, CardHeader, CardTitle } from '@/common/ui/card';

export default function EventResults({
  compId,
  competitions,
  setSearchParams,
  name,
}) {
  const { isLoading: isLoadingSingleCompetition, data: competition } =
    useGetCompetitionScoresheetByCompetition(compId);

  const listOfCompetitions =
    competitions?.map((item) => {
      return {
        name: item.name,
        value: item.id,
      };
    }) || [];

  const handleClick = (competition) => {
    setSearchParams(
      (prev) => {
        prev.set('compId', competition.value);
        prev.set('name', competition.name);
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <div className='shrink-0 flex-1'>
      <CardHeader className='p-0 mb-4'>
        <CardTitle className='text-xl text-primary font-semibold -mb-2'>
          Competition Results
        </CardTitle>
        <CardDescription>List of competitions with results</CardDescription>
      </CardHeader>
      <Tabs
        defaultValue={
          listOfCompetitions[0]?.name.toLowerCase() || name.toLocaleLowerCase()
        }
        className='w-full'
      >
        <TabsList>
          <Suspense fallback={<LoadingSpinner />}>
            {listOfCompetitions.map((competition) => (
              <TabsTrigger
                key={competition.value}
                value={competition.name.toLowerCase()}
                onClick={() => handleClick(competition)}
              >
                {competition.name}
              </TabsTrigger>
            ))}
          </Suspense>
        </TabsList>
        <TabsContent value={name.toLowerCase()}>
          {/* Load Judges Cards */}
          {isLoadingSingleCompetition ? (
            <LoadingSpinner />
          ) : (
            !isLoadingSingleCompetition &&
            competition && <JudgesCards judges={competition?.judges} />
          )}
          {/* Load Candidates Cards */}
          {isLoadingSingleCompetition ? (
            <LoadingSpinner />
          ) : (
            !isLoadingSingleCompetition &&
            competition && (
              <CandidatesCards
                criteria={competition?.criteria}
                scoresheet={competition?.scoresheet}
                judges={competition?.judges}
              />
            )
          )}
        </TabsContent>
        <TabsContent value='Password d'>Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
