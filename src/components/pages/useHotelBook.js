import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { hotelBook } from '../services/apiBooking';
import { useHotelsMainContext } from '../context/Resort/HotelsMainContext';
import { useNavigate } from 'react-router-dom';

export function useHotelBook() {
  const { dateCheckOut, dateCheckIn } = useHotelsMainContext();

  const searchParams = new URLSearchParams();
  const hotelId = searchParams.get('hotel_id');
  searchParams.append('hotel_id', hotelId);
  searchParams.append('startDate', dateCheckIn);
  searchParams.append('endDate', dateCheckOut);

  const navigate = useNavigate();

  const { mutate: hotelBooks, isLoading } = useMutation({
    mutationFn: ({ hotelId, startDate, endDate }) =>
      hotelBook({ hotelId, startDate, endDate }),
    onSuccess: () => {
      toast.success('Booking a hotel is sucessfully done.');
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

  return { hotelBooks, isLoading };
}
