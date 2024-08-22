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
    id: '',
    country_id: '',
    city_id: '',
    code: '',
    city_name: '',
    area_code: '',
    timezone: '',
    international_name: '',
    airport_code: '',
    local_name: '',
    local_city: '',
    country_code: '',
    country_vendor_id: '',
    is_active: true,
    created_at: '',
    updated_at: '',
  }

  return useQuery<MasterAirportListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
