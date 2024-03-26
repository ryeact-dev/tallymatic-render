import { getAllEvents } from '@/api/event.api';
import { ToastNotification } from '@/common/toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Queries

export function useGetAllEvents(userRole) {
  return useQuery({
    queryKey: ['events', userRole],
    queryFn: () => getAllEvents(),
    enabled: userRole !== 'admin',
    select: (data) => {
      // Returns the data in an object type { name, value}
      return data.map((event) => {
        return {
          value: event.id,
          name: event.name,
        };
      });
    },
  });
}

// Mutations

// export function useAddUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: addUser,
//     onError: ({ response }) => ToastNotification('error', response.data),
//     onSuccess: () => queryClient.invalidateQueries(['admin-and-managers']),
//   });
// }
