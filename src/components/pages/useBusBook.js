import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useBusesMainContext } from '../context/Buses/BusesMainContext';
import { busBook } from '../services/apiBooking';

export function useBusBook() {
  const searchParams = new URLSearchParams();
  const busId = searchParams.get('busId');
  const departureDate = searchParams.get('departureDate');

  const { date } = useBusesMainContext();

  searchParams.append('bus_id', busId);
  searchParams.append('startDate', date);
  searchParams.append('endDate', departureDate);

  const navigate = useNavigate();

  const { mutate: busBooks, isLoading } = useMutation({
    mutationFn: ({ busId, startDate, endDate }) =>
      busBook({ busId, startDate, endDate }),
    onSuccess: () => {
      toast.success('Booking a bus is sucessfully done.');
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

  return { busBooks, isLoading };
}
