import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTrainsMainContext } from '../context/Trains/TrainsMainContext';
import { trainBook } from '../services/apiBooking';

export function useTrainBook() {
  const searchParams = new URLSearchParams();
  const trainId = searchParams.get('trainId');

  const { date } = useTrainsMainContext();

  searchParams.append('train_id', trainId);
  searchParams.append('startDate', date);
  searchParams.append('endDate', date);

  const navigate = useNavigate();

  const { mutate: trainBooks, isLoading } = useMutation({
    mutationFn: ({ trainId, startDate, endDate }) =>
      trainBook({ trainId, startDate, endDate }),
    onSuccess: () => {
      toast.success('Booking a train is sucessfully done.');
      setTimeout(() => {
        navigate({
          pathname: '/payment',
          search: `?${searchParams.toString()}`,
        });
      }, 5000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { trainBooks, isLoading };
}
