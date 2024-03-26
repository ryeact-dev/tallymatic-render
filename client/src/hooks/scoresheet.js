import {
  addCandidateScore,
  getCompetitionScoresheetByCompetition,
  getCompetitionScoresheetByJudge,
  submitFinalScores,
} from '@/api/scoresheet.api';
import { ToastNotification } from '@/common/toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// QUERIES

export function useGetCompetitionScoresheetByJudge(compId, userId) {
  return useQuery({
    queryKey: ['scoresheet-by-judge', compId, userId],
    queryFn: () => getCompetitionScoresheetByJudge({ compId, userId }),
    enabled: !!compId && !!userId,
  });
}

export function useGetCompetitionScoresheetByCompetition(compId) {
  return useQuery({
    queryKey: ['scoresheet-by-judge', compId],
    queryFn: () => getCompetitionScoresheetByCompetition({ compId }),
    enabled: !!compId,
  });
}

// MUTATIONS

export function useAddScore(closeModal) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCandidateScore,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['list-of-candidate'] });
      queryClient.invalidateQueries({ queryKey: ['single-competition'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}

export function useSubmitFinalScores(setIsLoading, closeModal) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitFinalScores,
    onMutate: () => setIsLoading(true),
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: (data) => {
      ToastNotification('success', data);
      // TODO the judges will need to submit twice before the lock will update
      queryClient.invalidateQueries({ queryKey: ['judge-status'] });
      setIsLoading(false);
      navigate('/app/waiting-page', { replace: true });
      closeModal();
    },
  });
}
