import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';
import { extractCandidatesWithRanks } from '@/lib/helper/extractObjects';
import CompetitionJudges from './components/CompetitionJudges';
import { CardDescription, CardTitle } from '@/common/ui/card';

export default function ScoresTableMinorComp({
  competitions,
  finalistsCount,
  winnersToPrintRef,
  scoresToPrintRef,
}) {
  const finalScores = extractCandidatesWithRanks(competitions);

  const finalists = [...finalScores]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, finalistsCount);

  return (
    <>
      {/* Finalists */}
      <div className='text-center hidden print:block' ref={winnersToPrintRef}>
        <h2 className='text-2xl font-bold'>Top {finalistsCount} Finalists</h2>
        {finalists.map((candidate, index) => (
          <div key={index} className='mt-4'>
            <h2 className='text-xl font-bold'>{candidate.name}</h2>
            <h2>{`Candidate No. ${candidate.number}`}</h2>
            <h2>{candidate.course}</h2>
          </div>
        ))}
      </div>
      {/* Scores Table */}
      <div ref={scoresToPrintRef}>
        <div className='text-center hidden print:block'>
          <CardTitle className='text-xl text-primary font-bold -mb-1'>
            Overall Scores for Minor Competitions
          </CardTitle>
          <CardDescription>
            Total scores and ranks for all Minor Competitions
          </CardDescription>
        </div>
        <div className='rounded-md border mt-4'>
          <Table>
            <TableHeader>
              <TableRow className='flex pt-4 bg-primary rounded-t-lg hover:bg-primary'>
                <TableHead className='w-52 text-white font-bold'>
                  Candidate No. and Name
                </TableHead>
                {competitions.map((item) => {
                  return (
                    <TableHead
                      key={item.competition.id}
                      className='flex-1 -mt-2 text-center text-white'
                    >
                      <p className='font-bold'>{item.competition.name}</p>
                      <div className='flex gap-4 items-center justify-center'>
                        <p className='w-20'>Rank</p>
                        <p className='w-20'>Score</p>
                      </div>
                    </TableHead>
                  );
                })}
                <TableHead className='flex-1 -mt-3 text-center text-white'>
                  <p className='font-bold'>Total</p>
                  <div className='flex gap-4 items-center justify-center'>
                    <p className='w-20'>Rank</p>
                    <p className='w-20'>Score</p>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalScores.map(
                (
                  { number, name, course, photo, ranks, totalRank, rank },
                  index
                ) => (
                  <TableRow
                    key={`${name}${index}`}
                    className='flex items-center w-full '
                  >
                    <TableCell className='w-52'>
                      {number} - {name}
                    </TableCell>
                    <TableCell className='flex gap-4 flex-[5] text-center'>
                      {ranks?.map((rank, i) => (
                        <div
                          key={i}
                          className='flex gap-4 flex-1 justify-center'
                        >
                          <p className='w-20'>{rank} </p>
                          <p className='w-20 font-semibold dark:font-bold text-accent'>
                            {rank *
                              parseFloat(
                                competitions[i].competition.multiplier
                              )}
                          </p>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className='flex gap-4 flex-1 text-center justify-center'>
                      <p className='w-20'>{totalRank} </p>
                      <p className='w-20 font-bold text-accent'>{rank} </p>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
        <CompetitionJudges competitions={competitions} />
      </div>
    </>
  );
}
