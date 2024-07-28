import { useQuery } from '@tanstack/react-query';
import { getFlightsList } from '../../../services/apiFlights';

export function useFlightsList() {
  const { isLoading, data: flights } = useQuery({
    queryKey: ['flightList'],
    queryFn: getFlightsList,
  });

  return { isLoading, flights };
}
