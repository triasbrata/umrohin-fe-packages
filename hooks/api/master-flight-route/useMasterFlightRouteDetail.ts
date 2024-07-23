import { queryKeyMasterFlightRoute } from '@apps/packages/lib/constants'
import { MasterFlightRouteListItem } from '@apps/packages/services/master-flight-route'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterFlightRouteDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterFlightRouteListItem>
}

export const useMasterFlightRouteDetail = (opt?: useMasterFlightRouteDetailConfig) => {
  const { queryKey = [queryKeyMasterFlightRoute.MASTER_FLIGHT_ROUTE_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterFlightRouteListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    from_airport_id: '',
    to_airport_id: '',
  }

  return useQuery<MasterFlightRouteListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
