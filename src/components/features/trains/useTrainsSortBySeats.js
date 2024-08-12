import { useQuery } from '@tanstack/react-query';
import { getTrainSortBySeats } from '../../services/apiTrains';

export function useTrainsSortBySeats(source, destination, day) {
  const {
    isLoading,
    data: trainsSortBySeats,
    error,
  } = useQuery({
    queryKey: ['trainsSortBySeats', source, destination, day],
    queryFn: () => getTrainSortBySeats(source, destination, day),
    enabled: !!source && !!destination && !!day,
  });

  // Returning the query result states
  return { isLoading, trainsSortBySeats, error };
}
