import { useQuery } from '@tanstack/react-query';
import { getHotelCities } from '../../../services/apiHotels';

export function useHotelsLocation() {
  const {
    isLoading,
    data: hotelsLocation,
    error,
  } = useQuery({
    queryKey: ['hotelsLocation'],
    queryFn: () => getHotelCities(),
  });
  return { isLoading, hotelsLocation, error };
}
