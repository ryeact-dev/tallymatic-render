import { modalStore } from '@/store';
import { useTransition, animated } from '@react-spring/web';
import { MODAL_BODY_TYPES } from '@/lib/helper/globalConstantUtil';
import { competitionScoresheet } from '@/lib/helper/competitionScoresheet';
import SubmitFinalScoresBtn from './SubmitFinalScoresBtn';
import Image from '@/common/image/Image';

export default function CardsOfCandidates({
  candidates,
  currentUser,
  competition,
}) {
  const openModal = modalStore((state) => state.openModal);

  let candidateList = [...candidates];
  if (competition.isFinalist === 'true') {
    candidateList = candidateList.filter((candidate) =>
      competition.finalistList.includes(candidate.id)
    );
  }

  const transitions = useTransition(candidateList, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 500 },
    trail: 100,
  });

  const addScoreButton = (candidate, competition, candidateScoresheet) => {
    if (currentUser.role !== 'judge') return;

    const title = (
      <span className='text-primary'>{`Candidate Number: ${candidate.number}`}</span>
    );

    openModal({
      title,
      bodyType: MODAL_BODY_TYPES.CANDIDATE_SCORE,
      extraObject: { candidate, competition, candidateScoresheet },
      size: 'max-w-2xl',
    });
  };

  return (
    <>
      <div className='mt-2 flex flex-wrap gap-2 sm:gap-4'>
        {transitions((styles, candidate) => (
          <animated.div
            style={styles}
            className='rounded-xl overflow-hidden border-[1px] flex-col items-center relative w-full sm:h-[24rem] sm:w-[18rem] hover:shadow-xl transition-shadow duration-300 ease-in'
            key={candidate.id}
          >
            {/* <div className='absolute bottom-0 left-0 h-[7rem] w-full bg-gradient-to-t from-secondary/50 to-bg-accent-0 z-10' /> */}
            <figure
              className={`absolute top-0 left-0 h-[24rem] w-full hover:scale-110 transition-scale duration-300 ease-in ${
                currentUser.role === 'judge' && 'hover:cursor-pointer'
              }`}
              onClick={() =>
                // currentUser.role === 'judge' &&
                addScoreButton(
                  candidate,
                  competition,
                  competitionScoresheet(candidate.id, competition).scoresheet
                )
              }
            >
              <Image
                photo={candidate.photo}
                photo_hash={candidate.photo_hash}
              />
            </figure>

            {/* {currentUser.role !== 'judge' ? (
     
            {currentUser.judgeNumber > 0
              ? `${candidateScore(candidate.candidate_number)} Points`: 0}
            
          </div>
        ) : (
        )} */}
            <div
              className={`py-2.5 absolute bottom-0 
              z-20 w-full  flex gap-2 justify-center`}
              // onClick={() =>
              //   addScoreButton(
              //     candidate,
              //     competition,
              //     isTheCandidate(candidate.candidate_number)
              //   )
              // }
            >
              <div className='bg-accent/90 border-accent border-2 backdrop-blur-sm p-1 rounded-md size-12 flex items-center justify-center '>
                <p className='text-white text-2xl font-semibold -mt-1'>
                  {candidate.number < 10 && '0'}
                  {candidate.number}
                </p>
              </div>
              <div className='bg-primary/85 border-primary border-2 backdrop-blur-sm rounded-md h-12 w-[60%] flex items-center justify-center'>
                <p className='text-white text-2xl font-semibold uppercase -mt-1'>
                  {`${
                    competitionScoresheet(candidate.id, competition).totalScore
                  } pts `}
                </p>
              </div>
            </div>

            {/* <div className='absolute top-2 right-2 z-20 bg-primary/80 p-2 rounded-md size-10 flex items-center justify-center border-primary border'>
            <p className='text-white'>
              {candidate.number < 10 && '0'}
              {candidate.number}
            </p>
          </div> */}
          </animated.div>
        ))}
      </div>

      {currentUser.role === 'judge' && (
        <SubmitFinalScoresBtn
          competitionId={competition?.id || ''}
          userId={currentUser.userId}
        />
      )}
    </>
  );
}
