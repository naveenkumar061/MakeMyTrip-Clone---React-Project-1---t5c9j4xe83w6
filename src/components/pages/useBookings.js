import { useQuery } from '@tanstack/react-query';
import { getBookingList } from '../services/apiBooking';

export function useBookings() {
  const { isLoading, data: booking } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => getBookingList(),
  });

  return { isLoading, booking };
}
