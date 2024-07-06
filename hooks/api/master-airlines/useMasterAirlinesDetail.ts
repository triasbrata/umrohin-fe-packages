import { queryKeyMasterAirlines } from '@apps/packages/lib/constants'
import { MasterAirlinesListItem } from '@apps/packages/services/master-airlines'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterAirlinesDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterAirlinesListItem>
}

export const useMasterAirlinesDetail = (opt?: useMasterAirlinesDetailConfig) => {
  const { queryKey = [queryKeyMasterAirlines.MASTER_AIRLINES_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterAirlinesListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    code: '',
    name: '',
    logo: '',
    is_active: '',
  }

  return useQuery<MasterAirlinesListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
