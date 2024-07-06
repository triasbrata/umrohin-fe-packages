import { queryKeyMasterHotelInternal } from '@apps/packages/lib/constants'
import { MasterHotelInternalListItem } from '@apps/packages/services/master-hotel-internal'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterHotelInternalDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterHotelInternalListItem>
}

export const useMasterHotelInternalDetail = (opt?: useMasterHotelInternalDetailConfig) => {
  const { queryKey = [queryKeyMasterHotelInternal.MASTER_HOTEL_INTERNAL_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterHotelInternalListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    featured_image: '',
    hotel_name: '',
    short_description: '',
    stars: '',
    distance_meter: '',
    distance_from: '',
  }

  return useQuery<MasterHotelInternalListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
