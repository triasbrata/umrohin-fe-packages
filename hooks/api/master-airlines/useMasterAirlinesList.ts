import { queryKeyMasterAirlines } from '@apps/packages/lib/constants'
import { MasterAirlinesListItem } from '@apps/packages/services/master-airlines'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterAirlinesListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterAirlinesListItem[]>
}

export const useMasterAirlinesList = (opt?: useMasterAirlinesListConfig) => {
  const { queryKey = [queryKeyMasterAirlines.MASTER_AIRLINES_LIST], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterAirlinesListItem[] = queryClient.getQueryData(queryKey) ?? []

  return useQuery<MasterAirlinesListItem[]>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
