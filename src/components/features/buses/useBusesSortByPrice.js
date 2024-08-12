import { useQuery } from '@tanstack/react-query';
import { getBusesSortByPrice } from '../../services/apiBuses';

export function useBusesSortByPrice(source, destination, day) {
  const {
    isLoading,
    data: busesSortByPrice,
    error,
  } = useQuery({
    queryKey: ['busesSortByPrice', source, destination, day],
    queryFn: () => getBusesSortByPrice(source, destination, day),
    enabled: !!source && !!destination && !!day,
  });

  // Returning the query result states
  return { isLoading, busesSortByPrice, error };
}
