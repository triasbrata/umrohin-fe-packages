import { queryKeyMasterTourLocation } from '@apps/packages/lib/constants'
import { MasterTourLocationListItem } from '@apps/packages/services/master-tour-location'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterTourLocationDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterTourLocationListItem>
}

export const useMasterTourLocationDetail = (opt?: useMasterTourLocationDetailConfig) => {
  const { queryKey = [queryKeyMasterTourLocation.MASTER_TOUR_LOCATION_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterTourLocationListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    description: '',
    image: '',
    is_active: '',
  }

  return useQuery<MasterTourLocationListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
