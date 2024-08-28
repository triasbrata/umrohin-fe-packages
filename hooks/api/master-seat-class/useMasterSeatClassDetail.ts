import { queryKeyMasterSeatClass } from '@apps/packages/lib/constants'
import { MasterSeatClassListItem } from '@apps/packages/services/master-seat-class'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterSeatClassDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterSeatClassListItem>
}

export const useMasterSeatClassDetail = (opt?: useMasterSeatClassDetailConfig) => {
  const { queryKey = [queryKeyMasterSeatClass.MASTER_SEAT_CLASS_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterSeatClassListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    code: '',
    name: '',
    is_active: false,
    created_at: '',
    updated_at: '',
  }

  return useQuery<MasterSeatClassListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
