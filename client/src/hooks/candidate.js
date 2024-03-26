import {
  addCandidate,
  deleteCandidate,
  getAllCandidatesByEvent,
  getAllCandidatesByEventWithMajorCompetitions,
} from '@/api/candidate.api';
import { ToastNotification } from '@/common/toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// QUERIES

export function useGetAllCandidatesByEvent(eventId) {
  return useQuery({
    queryKey: ['list-of-candidate', eventId],
    queryFn: () => getAllCandidatesByEvent({ eventId }),
    select: (data) => {
      const sortedData = data.sort((a, b) => a.number - b.number);
      return sortedData;
    },
  });
}

export function useGetAllCandidatesByEventWithMajorComp(eventId) {
  return useQuery({
    queryKey: ['list-of-candidate-with-competition', eventId],
    queryFn: () => getAllCandidatesByEventWithMajorCompetitions({ eventId }),
    select: (data) => {
      const sortedData = data.sort((a, b) => a.number - b.number);
      return sortedData;
    },
  });
}

// MUTATIONS

export function useAddCandidate(closeModal) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCandidate,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-candidate'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}

export function useDeleteCandidate(setIsLoading, closeModal) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCandidate,
    onMutate: () => setIsLoading(true),
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-candidate'] });
      ToastNotification('success', data);
      setIsLoading(false);
      closeModal();
    },
  });
}
