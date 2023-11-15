import { queryKeyMasterTourLocation } from '@apps/split/lib/constants'
import { MasterTourLocationListItem } from '@apps/split/services/master-tour-location'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterTourLocationDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterTourLocationListItem>
}

export const useMasterTourLocationDetail = (opt?: useMasterTourLocationDetailConfig) => {
  const { queryKey = [queryKeyMasterTourLocation.MASTER_TOUR_LOCATION_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterTourLocationListItem = queryClient.getQueryData(queryKey) ?? {
    tour_location_id: '',
    name: '',
    city_id: '',
    status: 0,
    image: '',
    main_tour_location: false,
    is_highlight: false,
    city_name: '',
    province: '',
    country_name: '',
  }

  return useQuery<MasterTourLocationListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
