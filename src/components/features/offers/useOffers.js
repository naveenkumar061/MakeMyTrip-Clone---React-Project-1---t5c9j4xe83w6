import { useQuery } from '@tanstack/react-query';
import { getOffers } from '../../services/apiOffers';

export function useOffers() {
  const { isLoading, data: offers } = useQuery({
    queryKey: ['offerList'],
    queryFn: getOffers,
  });

  return { isLoading, offers };
}
