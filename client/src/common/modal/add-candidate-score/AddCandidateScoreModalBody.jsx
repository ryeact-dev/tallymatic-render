import { useEffect, useState } from 'react';
import { CardContent } from '@/common/ui/card';
import ScoresheetPhoto from './components/ScoresheetPhoto';
import ScoresheetForm from './components/ScoresheetForm';
import { useAddScore } from '@/hooks/scoresheet';
import { useGetCurrentUser } from '@/hooks/user';

export default function AddCandidateScoreModalBody({
  extraObject,
  closeModal,
}) {
  const {
    candidate: candidateInfo,
    competition,
    candidateScoresheet,
  } = extraObject;

  const currentUser = useGetCurrentUser();

  const addCandidateScoreMutation = useAddScore(closeModal);

  const [scoresheet, setScoresheet] = useState(
    candidateScoresheet ? candidateScoresheet.scores : competition.criteria
  );

  const [totalScore, setTotalScore] = useState(
    candidateScoresheet ? Number(candidateScoresheet.total) : 0
  );

  const handleRangeChange = (value, index) => {
    setScoresheet((prevState) => {
      let newArray = [...prevState];
      newArray[index] = { ...newArray[index], score: value[0] };
      return newArray;
    });
  };

  const handleInputChange = (evt, index) => {
    const value = evt.target.value;

    setScoresheet((prevState) => {
      let newArray = [...prevState];
      newArray[index] = { ...newArray[index], score: value };
      return newArray;
    });
  };

  const formCalculateTotal = () => {
    const total = scoresheet.reduce(
      (total, score) => total + Number(score.score),
      0
    );

    return total.toFixed(1);
  };

  useEffect(() => {
    // This useEffect is to monitor if the use input way above
    // the max percentage of a score
    scoresheet?.forEach((item, index) => {
      if (item.score > Number(item.percent)) {
        const newScoresheet = [...scoresheet];
        newScoresheet[index].score = Number(item.percent);
        setScoresheet(() => newScoresheet);
      }
    });

    setTotalScore(formCalculateTotal());
  }, [scoresheet]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let scoresheetObj = {
      scores: scoresheet,
      userId: currentUser.userId,
      candidateId: candidateInfo.id,
      competitionId: competition.id,
      total: Number(totalScore),
    };

    if (candidateScoresheet) {
      scoresheetObj = { ...scoresheetObj, id: candidateScoresheet.id };
      addCandidateScoreMutation.mutate({ scoresheetObj, isNew: false });
    } else {
      addCandidateScoreMutation.mutate({ scoresheetObj, isNew: true });
    }
  };

  return (
    <form className='space-y-8 flex flex-col' onSubmit={handleSubmit}>
      <CardContent className='p-0 flex gap-6'>
        <ScoresheetPhoto
          candidateInfo={candidateInfo}
          totalScore={totalScore}
        />
        <ScoresheetForm
          closeModal={closeModal}
          scoresheet={scoresheet}
          handleRangeChange={handleRangeChange}
          handleInputChange={handleInputChange}
          loadingMutation={addCandidateScoreMutation.isPending}
        />
      </CardContent>
    </form>
  );
}
