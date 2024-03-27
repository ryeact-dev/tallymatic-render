import {
  addUser,
  deleteUser,
  getAdminAndManagerUsers,
  getJudgeStatus,
  getJudgesAndTabulators,
  loginUser,
  logoutUser,
  resetPassword,
} from '@/api/user.api';
import { ToastNotification } from '@/common/toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMatches, useNavigate } from 'react-router-dom';

// QUERIES

export function useGetCurrentUser() {
  const currentUser = useMatches()[0].data;
  return currentUser || null;
}

export function useGetJudgesStatus({ userId, fetchTrigger, userRole }) {
  const intveral = userRole === 'judge' ? 1000 : 86400000;

  return useQuery({
    queryKey: ['judge-status', userId, fetchTrigger],
    queryFn: () => getJudgeStatus({ userId }),
    enabled: !!userId,
    refetchInterval: intveral,
  });
}

export function useGetAdminManagers() {
  return useQuery({
    queryKey: ['admin-and-managers'],
    queryFn: () => getAdminAndManagerUsers(),
  });
}

export function useGetJudgesTabulators() {
  return useQuery({
    queryKey: ['judges-and-tabulators'],
    queryFn: () => getJudgesAndTabulators(),
    select: (data) => {
      const users = data.map((user) => {
        return {
          ...user,
          competitions: user.competitions.map((item) => {
            return {
              value: item.id,
              name: item.name,
            };
          }),
        };
      });

      return users;
    },
  });
}

// MUTATIONS

// Login user
export function useLoginUser() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: () => {
      navigate('/app/dashboard', { replace: true });
    },
  });
}

// Logout user

export function useLogoutUser(setIsLoading, closeModal) {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setTimeout(() => {
        localStorage.clear();
      }, 50);

      setIsLoading(false);
      closeModal();
      window.location.href = '/login';
    },
  });
}

// Add user
export function useAddUser(closeModal) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-and-managers'] });
      queryClient.invalidateQueries({ queryKey: ['judges-and-tabulators'] });
      ToastNotification('success', 'User successfully added.');
      closeModal();
    },
  });
}

// Delete user
export function useDeleteUser(setIsLoading, closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: () => setIsLoading(true),
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-and-managers'] });
      queryClient.invalidateQueries({ queryKey: ['judges-and-tabulators'] });
      ToastNotification('success', 'User successfully removed.');
      setIsLoading(false);
      closeModal();
    },
  });
}

// Reser user password
export function useResetUserPassword(closeModal) {
  return useMutation({
    mutationFn: resetPassword,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: () => {
      ToastNotification('success', 'Password successfully reset.');
      closeModal();
    },
  });
}
