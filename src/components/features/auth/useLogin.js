import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { loginUser } from '../../services/apiAuth';
import { useLoginContext } from '../../context/login/LoginContext';

export function useLogin(close) {
  const { setIsAuthenticated } = useLoginContext();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (user) => {
      sessionStorage.setItem('authToken', user.token);
      sessionStorage.setItem('name', user.data.user.name);
      sessionStorage.setItem('email', user.data.user.email);
      toast.success('Logged in successfully.');
      setIsAuthenticated(true);
      setTimeout(() => {
        close();
      }, 1000);
    },
    onError: (err) => {
      if (err.message === 'Unauthorized: Invalid email or password') {
        toast.error('Unauthorized: Invalid email or password');
        close();
      } else {
        toast.error(err.message);
        close();
      }
    },
  });

  return { login, isLoading };
}
