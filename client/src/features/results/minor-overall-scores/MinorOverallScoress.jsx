import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import NoRecordsFound from '@/common/typography/NoRecordsFound';

import CardContainer from '@/containers/CardContainer';
import {
  useGetMajorCompetitions,
  useGetMinorCompetitions,
} from '@/hooks/competition';

import { CardDescription, CardHeader, CardTitle } from '@/common/ui/card';
import { useRef } from 'react';
import { Button } from '@/common/ui/button';
import { Printer } from 'lucide-react';
import ScoresTableMinorComp from './components/overallscores-minor/ScoresTableMinorComp';
import ReactToPrint from 'react-to-print';

export default function MinorOverallScores({ currentUser }) {
  const scoresToPrintRef = useRef(null);
  const winnersToPrintRef = useRef(null);

  const eventId = currentUser.eventId;

  const { isLoading, data: competitions = [] } = useGetMinorCompetitions({
    eventId,
  });

  const { data: majorCompetitions = [] } = useGetMajorCompetitions({
    eventId,
  });

  const printResultsBtn = (
    <Button className='px-6 normal-case text-base gap-2'>
      <Printer size={20} strokeWidth={2} className='' />
      Print Scores
    </Button>
  );

  const printFinalistsBtn = (
    <Button
      variant='outline'
      className='px-6 normal-case text-base gap-2 border-accent text-accent'
    >
      <Printer size={20} strokeWidth={2} className='' />
      Print Finalists
    </Button>
  );

  const reactToPrintScoresBtn = (
    <ReactToPrint
      // pageStyle={'@page {  margin: 20mm 5mm; }'}
      trigger={() => printResultsBtn}
      content={() => scoresToPrintRef.current}
    />
  );

  const reactToPrintWinnerBtn = (
    <ReactToPrint
      pageStyle={'@page { size: A4 portrait; }'}
      trigger={() => printFinalistsBtn}
      content={() => winnersToPrintRef.current}
    />
  );

  const cardHeader = (
    <CardHeader className='flex-row items-center justify-between p-0'>
      <div>
        <CardTitle className='text-xl text-primary font-bold -mb-1'>
          Overall Scores for Minor Competitions
        </CardTitle>
        <CardDescription>
          Total scores and ranks for all Minor Competitions
        </CardDescription>
      </div>
      <div className='space-x-3'>
        {reactToPrintWinnerBtn}
        {reactToPrintScoresBtn}
      </div>
    </CardHeader>
  );

  return (
    <CardContainer cardHeader={cardHeader}>
      {isLoading ? (
        <LoadingSpinner />
      ) : competitions.length > 0 ? (
        <ScoresTableMinorComp
          competitions={competitions}
          finalistsCount={majorCompetitions[0]?.finalists}
          winnersToPrintRef={winnersToPrintRef}
          scoresToPrintRef={scoresToPrintRef}
        />
      ) : (
        <NoRecordsFound>No Records Found</NoRecordsFound>
      )}
    </CardContainer>
  );
}
