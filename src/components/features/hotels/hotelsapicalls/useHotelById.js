import { useQuery } from '@tanstack/react-query';
import { getHotelById } from '../../../services/apiHotels';

export function useHotelById(id) {
  const { isLoading, data: hotelDetails } = useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getHotelById(id),
  });
  return { isLoading, hotelDetails };
}
