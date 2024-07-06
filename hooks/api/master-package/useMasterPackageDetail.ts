import { queryKeyMasterPackage } from '@apps/packages/lib/constants'
import { MasterPackageListItem } from '@apps/packages/services/master-package'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterPackageDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterPackageListItem>
}

export const useMasterPackageDetail = (opt?: useMasterPackageDetailConfig) => {
  const { queryKey = [queryKeyMasterPackage.MASTER_PACKAGE_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterPackageListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    day: '',
    night: '',
    hotel_name: '',
    bedroom: '',
    short_description: '',
    description: '',
    airport_departure: '',
    date_departure: '',
    date_arrived: '',
    capacity: '',
    price: '',
    discount: '',
    discount_price: '',
    status: '',
    featured_image: '',
    image: '',
    facilities: [],
    leaders: [],
    partner_id: '',
    hotels: [],
    flights: [],
    highlight: true,
    price_quad: '',
    price_double: '',
    price_triple: '',
    object_wisata: [],
  }

  return useQuery<MasterPackageListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
