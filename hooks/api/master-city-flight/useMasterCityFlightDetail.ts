import { queryKeyMasterCityFlight } from '@apps/packages/lib/constants'
import { MasterCityFlightListItem } from '@apps/packages/services/master-city-flight'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterCityFlightDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterCityFlightListItem>
}

export const useMasterCityFlightDetail = (opt?: useMasterCityFlightDetailConfig) => {
  const { queryKey = [queryKeyMasterCityFlight.MASTER_CITY_FLIGHT_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterCityFlightListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    code: '',
    name: '',
  }

  return useQuery<MasterCityFlightListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
