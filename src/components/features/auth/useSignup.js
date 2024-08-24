import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createUser } from '../../services/apiAuth';
import { useLoginContext } from '../../context/login/LoginContext';

export function useSignup(close) {
  const queryClient = useQueryClient();
  const { setIsAuthenticated } = useLoginContext();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      toast.success('New User created successfully');
      sessionStorage.setItem('authToken', user.token);
      sessionStorage.setItem('name', user.data.user.name);
      sessionStorage.setItem('email', user.data.user.email);
      setIsAuthenticated(true);
      queryClient.invalidateQueries('user');
      setTimeout(() => {
        close();
      }, 5000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isCreating };
}
