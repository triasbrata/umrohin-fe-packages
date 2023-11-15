import { queryKeyMasterHotel } from '@apps/split/lib/constants'
import { MasterHotelListItem } from '@apps/split/services/master-hotel'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterHotelDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterHotelListItem>
}

export const useMasterHotelDetail = (opt?: useMasterHotelDetailConfig) => {
  const { queryKey = [queryKeyMasterHotel.MASTER_HOTEL_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterHotelListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    city_id: '',
    city_name: '',
    distance_to_masjidil_haram: 0,
    distance_to_masjid_nabawi: 0,
    star: 0,
    icon_url: '',
    status: 0,
  }

  return useQuery<MasterHotelListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
