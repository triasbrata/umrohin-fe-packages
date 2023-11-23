import { queryKeyMasterTourLeader } from '@apps/packages/lib/constants'
import { MasterTourLeaderListItem } from '@apps/packages/services/master-tour-leader'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterTourLeaderDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterTourLeaderListItem>
}

export const useMasterTourLeaderDetail = (opt?: useMasterTourLeaderDetailConfig) => {
  const { queryKey = [queryKeyMasterTourLeader.MASTER_TOUR_LEADER_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterTourLeaderListItem = queryClient.getQueryData(queryKey) ?? {
    tour_leader_id: '',
    name: '',
    is_highlight: false,
    thumbnail: '',
    image: '',
    status: 0,
    desc: '',
  }

  return useQuery<MasterTourLeaderListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
