import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createUser } from '../../services/apiAuth';

export function useSignup(close) {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('New User created successfully');
      queryClient.invalidateQueries('user');
      setTimeout(() => {
        close();
      }, 5000);
    },
    onError: (err) => {
      toast.error(err.message);
      setTimeout(() => {
        close();
      }, 5000);
    },
  });
  return { mutate, isCreating };
}
