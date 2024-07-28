import { useQuery } from '@tanstack/react-query';
import { getHotelsPresentInCities } from '../../../services/apiHotels';

export function useHotelLoc(cityName, sort) {
  const { isLoading, data: hotelsInCity } = useQuery({
    queryKey: ['hotelsLocation', cityName, sort],
    queryFn: () => getHotelsPresentInCities(cityName, sort),
  });
  return { isLoading, hotelsInCity };
}
