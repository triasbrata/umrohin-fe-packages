import { queryKeyMasterAirlines } from '@apps/split/lib/constants'
import { MasterAirlinesListItem } from '@apps/split/services/master-airlines'
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
    logo_url: '',
    name: '',
    is_highlight: false,
    status: 0,
  }

  return useQuery<MasterAirlinesListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
