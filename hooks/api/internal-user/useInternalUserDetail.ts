import { queryKeyInternalUser } from '@apps/split/lib/constants'
import { InternalUserListItem } from '@apps/split/services/internal-user'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useInternalUserDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<InternalUserListItem>
}

export const useInternalUserDetail = (opt?: useInternalUserDetailConfig) => {
  const { queryKey = [queryKeyInternalUser.INTERNAL_USER_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: InternalUserListItem = queryClient.getQueryData(queryKey) ?? {
    user_id: '',
    name: '',
    email: '',
    phone_number: '',
    status: 0,
    has_password: false,
    roles: [],
  }

  return useQuery<InternalUserListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
