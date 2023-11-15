import { queryKeyMasterAirport } from '@apps/packages/lib/constants'
import { MasterAirportListItem } from '@apps/packages/services/master-airport'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterAirportDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterAirportListItem>
}

export const useMasterAirportDetail = (opt?: useMasterAirportDetailConfig) => {
  const { queryKey = [queryKeyMasterAirport.MASTER_AIRPORT_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterAirportListItem = queryClient.getQueryData(queryKey) ?? {
    name: '',
    status: 0,
    code: '',
    city_id: '',
    airport_id: '',
    created_by: '',
    created_at: '',
    updated_by: '',
    updated_at: '',
    city: {
      city_id: '',
      city_name: '',
    },
  }

  return useQuery<MasterAirportListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
