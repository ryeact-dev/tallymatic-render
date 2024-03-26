import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import SelectCompetition from '@/common/selection/SelectCompetition';
import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import NoRecordsFound from '@/common/typography/NoRecordsFound';
import CardContainer from '@/containers/CardContainer';
import { useGetCompetitionScoresheetByCompetition } from '@/hooks/scoresheet';
import ScoresheetTableByCompetition from './components/ScoresheetTableByCompetition';
import { CardDescription, CardTitle } from '@/common/ui/card';
import { Button } from '@/common/ui/button';
import { Printer } from 'lucide-react';
import { useGetMajorCompetitions } from '@/hooks/competition';

export default function ScoresByCompetition({ currentUser }) {
  const scoresToPrintRef = useRef(null);
  const winnerToPrintRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams({
    compId: '',
    name: '',
  });

  const compId = searchParams.get('compId');
  const name = searchParams.get('name');
  const eventId = currentUser.eventId;

  const { isLoading, data: competition } =
    useGetCompetitionScoresheetByCompetition(compId);

  const { data: majorCompetitions = [] } = useGetMajorCompetitions({ eventId });

  const printResultsBtn = (
    <Button className='px-6 normal-case text-base gap-2'>
      <Printer size={20} strokeWidth={2.5} className='' />
      Print Scores
    </Button>
  );

  const printWinnerBtn = (
    <Button
      variant='outline'
      className='px-6 normal-case text-base gap-2 border-accent text-accent'
    >
      <Printer size={20} strokeWidth={2.5} className='' />
      Print Winner
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
      trigger={() => printWinnerBtn}
      content={() => winnerToPrintRef.current}
    />
  );

  const cardHeader = (
    <>
      <div>
        <CardTitle className='flex-1 font-bold text-primary text-xl -mb-1'>
          {name}
        </CardTitle>
        <CardDescription>
          {competition
            ? competition?.isFinalist === 'true'
              ? 'Major Competition'
              : 'Minor Competition'
            : 'Please select a competition'}
        </CardDescription>
      </div>
      <div className='flex-1 flex items-center justify-end gap-3 !m-0'>
        {reactToPrintWinnerBtn}
        {reactToPrintScoresBtn}
        <SelectCompetition
          currentUser={currentUser}
          setSearchParams={setSearchParams}
          compId={compId}
        />
      </div>
    </>
  );

  return (
    <CardContainer
      className={'w-full'}
      cardHeader={cardHeader}
      headerClass={'flex-row items-center justify-between'}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : competition ? (
        competition?.scoresheet?.length === 0 ? (
          <NoRecordsFound>No Recors Found.</NoRecordsFound>
        ) : (
          <ScoresheetTableByCompetition
            majorCompetitions={majorCompetitions}
            scoresToPrintRef={scoresToPrintRef}
            winnerToPrintRef={winnerToPrintRef}
            name={name}
            isFinalist={competition?.isFinalist}
            criteria={competition?.criteria}
            scoresheet={competition?.scoresheet}
            judges={competition?.judges}
          />
        )
      ) : (
        ''
      )}
    </CardContainer>
  );
}
