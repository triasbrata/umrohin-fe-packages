import { queryKeyMitraGroupMember } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MitraGroupMemberListParams,
  MitraGroupMemberListResponse,
  MitraGroupMemberListResponseSchema,
} from '@apps/packages/services/mitra-group-member'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMitraGroupMemberListConfig = {
  queryKey?: QueryKey
  params?: MitraGroupMemberListParams
  options?: UseQueryOptions<MitraGroupMemberListResponse>
}

export const useMitraGroupMemberList = (opt?: useMitraGroupMemberListConfig) => {
  const {
    queryKey = [queryKeyMitraGroupMember.MITRA_GROUP_MEMBER_LIST],
    params = { id: 0, page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MitraGroupMemberListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.mitraGroupMember.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MitraGroupMemberListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
