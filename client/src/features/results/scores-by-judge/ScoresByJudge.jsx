import SelectCompetition from '@/common/selection/SelectCompetition';
import SelectJudge from '@/common/selection/SelectJudge';
import CardContainer from '@/containers/CardContainer';
import { useGetCompetitionScoresheetByJudge } from '@/hooks/scoresheet';

import { useSearchParams } from 'react-router-dom';
import ScoresheetTableByJudge from './components/ScoresheetTableByJudge';
import NoRecordsFound from '@/common/typography/NoRecordsFound';
import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import { CardContent, CardDescription, CardTitle } from '@/common/ui/card';

import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { Printer } from 'lucide-react';
import { Button } from '@/common/ui/button';

export default function ScoresByJudge({ currentUser }) {
  const componentToPrintRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams({
    compId: '',
    userId: '',
    name: '',
  });

  const compId = searchParams.get('compId');
  const userId = searchParams.get('userId');
  const name = searchParams.get('name');

  const { isLoading, data: competition } = useGetCompetitionScoresheetByJudge(
    compId,
    userId
  );

  const printResultsBtn = (
    <Button className='px-6 normal-case text-base gap-2'>
      <Printer size={20} strokeWidth={2.5} className='' />
      Print Scores
    </Button>
  );

  const reactToPrintBtn = (
    <ReactToPrint
      // pageStyle={'@page {  margin: 20mm 5mm; }'}
      trigger={() => printResultsBtn}
      content={() => componentToPrintRef.current}
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
            : 'Please select a competition and judge'}
        </CardDescription>
      </div>
      <div className='flex-1 flex items-center justify-end gap-3 !m-0'>
        {reactToPrintBtn}
        <SelectCompetition
          currentUser={currentUser}
          setSearchParams={setSearchParams}
          compId={compId}
        />
        <SelectJudge
          compId={compId}
          setSearchParams={setSearchParams}
          userId={userId}
        />
      </div>
    </>
  );

  return (
    <CardContainer
      cardHeader={cardHeader}
      headerClass={'flex-row items-center justify-between'}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : competition ? (
        competition?.scoresheet?.length === 0 ? (
          <NoRecordsFound>No Recors Found.</NoRecordsFound>
        ) : (
          <div ref={componentToPrintRef}>
            <div className='text-center hidden print:block '>
              <CardTitle className='flex-1 font-bold text-primary text-2xl -mb-1'>
                {name}
              </CardTitle>
              <CardDescription>
                {competition
                  ? competition?.isFinalist === 'true'
                    ? 'Major Competition'
                    : 'Minor Competition'
                  : 'Please select a competition and judge'}
              </CardDescription>
            </div>
            <ScoresheetTableByJudge
              scoresheet={competition?.scoresheet}
              criteria={competition?.criteria}
            />
            <CardContent className='mt-16 flex flex-col items-end '>
              <div className='text-center'>
                <p className='text-sm border-b font-bold'>
                  {competition?.users[0].fullName}
                </p>
                <p className='text-sm'>
                  Judge: {competition?.users[0].judgeNumber}
                </p>
              </div>
            </CardContent>
          </div>
        )
      ) : (
        ''
      )}
    </CardContainer>
  );
}
