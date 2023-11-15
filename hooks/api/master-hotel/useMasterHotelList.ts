import { queryKeyMasterHotel } from '@apps/split/lib/constants'
import { MasterHotelListItem } from '@apps/split/services/master-hotel'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterHotelListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterHotelListItem[]>
}

export const useMasterHotelList = (opt?: useMasterHotelListConfig) => {
  const { queryKey = [queryKeyMasterHotel.MASTER_HOTEL_LIST], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterHotelListItem[] = queryClient.getQueryData(queryKey) ?? []

  return useQuery<MasterHotelListItem[]>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
