import { useQuery } from '@tanstack/react-query';
import { getOffersByFilter } from '../../services/apiOffers';
import { useOffersContext } from '../../context/offers/OffersContext';

export function useOfferByFilter() {
  const { clickedValue: type } = useOffersContext();
  const { isLoading, data: offerByFilter } = useQuery({
    queryKey: ['offerByFilter', type],
    queryFn: () => getOffersByFilter(type),
  });

  return { isLoading, offerByFilter };
}
