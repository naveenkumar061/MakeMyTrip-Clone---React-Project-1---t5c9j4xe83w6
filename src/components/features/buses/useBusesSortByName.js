import { useQuery } from '@tanstack/react-query';
import { getBusesSortByName } from '../../services/apiBuses';

export function useBusesSortByName(source, destination, day) {
  const {
    isLoading,
    data: busesSortByName,
    error,
  } = useQuery({
    queryKey: ['busesSortByName', source, destination, day],
    queryFn: () => getBusesSortByName(source, destination, day),
    enabled: !!source && !!destination && !!day,
  });

  return { isLoading, busesSortByName, error };
}
