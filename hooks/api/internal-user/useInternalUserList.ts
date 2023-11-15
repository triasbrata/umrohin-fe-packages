import { queryKeyInternalUser } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import { placeholderListBuilder } from '@apps/services/BaseResponse'
import {
  InternalUserListParams,
  InternalUserListResponse,
  InternalUserListResponseSchema,
} from '@apps/packages/services/internal-user'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useInternalUserListConfig = {
  queryKey?: QueryKey
  params?: InternalUserListParams
  options?: UseQueryOptions<InternalUserListResponse>
}

export const useInternalUserList = (opt?: useInternalUserListConfig) => {
  const {
    queryKey = [queryKeyInternalUser.INTERNAL_USER_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: InternalUserListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.internalUser.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: InternalUserListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
