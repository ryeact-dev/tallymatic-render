import {
  addCompetition,
  addCompetitionFinalist,
  compDelete,
  compStatusUpdate,
  getActiveCompetition,
  getAllCompetitionsByEvent,
  getMajorCompetitions,
  getMinorCompetitions,
  getSingleCompetition,
  removeCompetitionFinalist,
} from '@/api/competition.api';
import { ToastNotification } from '@/common/toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// QUERIES

export function useGetAllCompetitionsByEvent(eventId, isCompetitionSettings) {
  const intveral = isCompetitionSettings ? 3000 : 86400000;

  return useQuery({
    queryKey: ['list-of-competitions', eventId],
    queryFn: () => getAllCompetitionsByEvent({ eventId }),
    enabled: !!eventId,
    refetchInterval: intveral,
    select: (data) => {
      const sortedData = data.sort((a, b) => a.number - b.number);
      return sortedData;
    },
  });
}

export function useGetSingleCompetition({ id, userId }) {
  return useQuery({
    queryKey: ['single-competition', id, userId],
    queryFn: () => getSingleCompetition({ id, userId }),
    enabled: !!id && !!userId,
  });
}

export function useGetActiveCompetition({ eventId, userRole }) {
  const intveral = userRole === 'judge' ? 1000 : 86400000;

  return useQuery({
    queryKey: ['single-active-competition', eventId],
    queryFn: () => getActiveCompetition({ eventId }),
    enabled: !!eventId,
    refetchInterval: intveral,
  });
}

export function useGetMinorCompetitions({ eventId }) {
  return useQuery({
    queryKey: ['list-of-minor-competitions', eventId],
    queryFn: () => getMinorCompetitions({ eventId }),
    enabled: !!eventId,
  });
}

export function useGetMajorCompetitions({ eventId }) {
  return useQuery({
    queryKey: ['list-of-major-competitions', eventId],
    queryFn: () => getMajorCompetitions({ eventId }),
    enabled: !!eventId,
  });
}

// MUTATIONS

export function useAddCompetition(closeModal) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCompetition,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-competitions'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}

export function useAddFinalist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCompetitionFinalist,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-competitions'] });
      ToastNotification('success', data);
    },
  });
}

export function useRemoveFinalist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCompetitionFinalist,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-competitions'] });
      ToastNotification('success', data);
    },
  });
}

export function useUpdateCompStatus(setIsLoading, closeModal) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: compStatusUpdate,
    onMutate: () => setIsLoading(true),
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-competitions'] });
      ToastNotification('success', data);
      setIsLoading(false);
      closeModal();
    },
  });
}

export function useDeleteCompetition(setIsLoading, closeModal) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: compDelete,
    onMutate: () => setIsLoading(true),
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-competitions'] });
      ToastNotification('success', data);
      setIsLoading(false);
      closeModal();
    },
  });
}
