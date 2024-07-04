import { queryKeyInternalUser } from '@apps/packages/lib/constants'
import { InternalUserListItem } from '@apps/packages/services/internal-user'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useInternalUserDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<InternalUserListItem>
}

export const useInternalUserDetail = (opt?: useInternalUserDetailConfig) => {
  const { queryKey = [queryKeyInternalUser.INTERNAL_USER_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: InternalUserListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    email: '',
    password: '',
    role_id: '',
    status: '',
  }

  return useQuery<InternalUserListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
