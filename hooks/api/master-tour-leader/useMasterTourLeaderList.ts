import { queryKeyMasterTourLeader } from '@apps/split/lib/constants'
import { MasterTourLeaderListItem } from '@apps/split/services/master-tour-leader'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterTourLeaderListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterTourLeaderListItem[]>
}

export const useMasterTourLeaderList = (opt?: useMasterTourLeaderListConfig) => {
  const { queryKey = [queryKeyMasterTourLeader.MASTER_TOUR_LEADER_LIST], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterTourLeaderListItem[] = queryClient.getQueryData(queryKey) ?? []

  return useQuery<MasterTourLeaderListItem[]>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
