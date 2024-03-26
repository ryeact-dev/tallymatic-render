import { CardDescription, CardTitle } from '@/common/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';
import { aggregatedScoresheetByJudges } from '@/lib/helper/aggregatedScoresheet';
import { competitionScoresAndRanks } from '@/lib/helper/extractObjects';
import CompetitionJudges from './CompetitionJudges';
import { getFinalistsCount } from '@/lib/helper/getFinalistsCount';

export default function ScoresheetTableByCompetition({
  majorCompetitions,
  isFinalist,
  criteria,
  scoresheet,
  judges,
  name,
  winnerToPrintRef,
  scoresToPrintRef,
}) {
  const result = aggregatedScoresheetByJudges(scoresheet, judges);
  const { candidates, judgeScores } = result;

  const total = competitionScoresAndRanks(judgeScores, candidates);
  const finalistCount = getFinalistsCount(majorCompetitions, name);
  const winner =
    isFinalist === 'false'
      ? total.filter((candidate) => candidate.rank === 1)
      : total.slice(0, finalistCount);

  return (
    <>
      {/* Competition Winner */}
      <div className='text-center hidden print:block' ref={winnerToPrintRef}>
        <h2 className='text-2xl font-bold'>{name} Competition</h2>
        <p className='text-xl italic font-semibold'>Winner</p>
        {winner.map((candidate, index) => (
          <div key={index} className='mt-4'>
            <h2 className='text-xl font-bold'>{candidate.name}</h2>
            <h2>{`Candidate No. ${candidate.number}`}</h2>
            <h2>{candidate.course}</h2>
          </div>
        ))}
      </div>
      {/* Scores Table */}
      <div ref={scoresToPrintRef}>
        <div className='text-center hidden print:block '>
          <CardTitle className='flex-1 font-bold text-primary text-2xl -mb-1'>
            {name}
          </CardTitle>
          <CardDescription>
            {isFinalist === 'true' ? 'Major Competition' : 'Minor Competition'}
          </CardDescription>
        </div>
        <div className='rounded-md border mt-4'>
          <Table>
            <TableHeader>
              <TableRow className='flex pt-4 bg-primary rounded-t-lg hover:bg-primary'>
                <TableHead className='flex-1 text-white font-bold'>
                  Candidate No. and Name
                </TableHead>
                {judges
                  .sort((a, b) => a.judgeNumber - b.judgeNumber)
                  .map((judge) => {
                    return (
                      <TableHead
                        key={judge.id}
                        className='flex-1 -mt-3 text-center text-white'
                      >
                        <p className='font-bold'>{`Judge ${judge.judgeNumber}`}</p>
                        <div className='flex gap-4 items-center justify-center '>
                          {isFinalist === 'true' && criteria.length > 0
                            ? criteria.map((item, i) => (
                                <p key={i} className='w-14 print:hidden'>
                                  {item.criteriaTitle}
                                </p>
                              ))
                            : ''}
                          <p className='w-14'>Score</p>
                          <p className='w-14'>Rank</p>
                        </div>
                      </TableHead>
                    );
                  })}
                <TableHead className='flex-1 -mt-3 text-center text-white'>
                  <p className='font-bold'>Total</p>
                  <div className='flex gap-2 items-center justify-center'>
                    <p className='w-14'>Score</p>
                    <p className='w-14'>Rank</p>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates
                ?.sort((a, b) => a.number - b.number)
                .map(({ number, name }, index) => (
                  <TableRow key={index} className='flex items-center w-full'>
                    <TableCell className='flex-1'>
                      {number} - {name}
                    </TableCell>
                    <TableCell
                      className={`flex gap-4 flex-[${judges?.length}] text-center`}
                    >
                      {judgeScores.map((item, i) => (
                        <div
                          key={i}
                          className='flex gap-4 flex-1 justify-center'
                        >
                          {/* if there are scores for the candidate  */}
                          {isFinalist === 'true' ? (
                            item.candidateScores.length > 0 ? (
                              item.candidateScores[index].scores.map(
                                (score, k) => (
                                  <p key={k} className='w-14 print:hidden'>
                                    {score.score}
                                  </p>
                                )
                              )
                            ) : (
                              <>
                                {/* if no scores yet and the competition is finalist */}
                                <p className='w-14'>0</p>
                                <p className='w-14'>0</p>
                              </>
                            )
                          ) : (
                            '' // return nothing if the competition is not on finalist
                          )}

                          {/* Displays total score */}
                          <p className='w-14'>
                            {item.candidateScores.length > 0
                              ? item.candidateScores[index].total
                              : 0}
                          </p>

                          {/* Displays rank */}
                          <p className='w-14 text-accent font-semibold'>
                            {item.candidateScores.length > 0
                              ? item.candidateScores[index].rank
                              : 0}
                          </p>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className='flex gap-3 flex-1 text-center justify-center'>
                      <p className='w-14 pl-2'>{total[index].totalRank}</p>
                      <p className='w-14 pl-2 text-accent font-bold'>
                        {total[index].rank}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <CompetitionJudges judges={judges} />
      </div>
    </>
  );
}
