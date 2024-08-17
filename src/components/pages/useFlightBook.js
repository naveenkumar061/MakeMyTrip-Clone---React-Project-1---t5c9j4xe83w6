import { useMutation } from '@tanstack/react-query';
import { flightBook } from '../services/apiBooking';
import toast from 'react-hot-toast';

export function useFlightBook() {
  const { mutate: flightBooks, isLoading } = useMutation({
    mutationFn: ({ flightId, startDate, endDate }) =>
      flightBook({ flightId, startDate, endDate }),
    onSuccess: () => {
      toast.success('Booking a flight is sucessfully done.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { flightBooks, isLoading };
}
