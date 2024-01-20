import { queryKeyMitraGroup } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MitraGroupListParams,
  MitraGroupListResponse,
  MitraGroupListResponseSchema,
} from '@apps/packages/services/mitra-group'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMitraGroupListConfig = {
  queryKey?: QueryKey
  params?: MitraGroupListParams
  options?: UseQueryOptions<MitraGroupListResponse>
}

export const useMitraGroupList = (opt?: useMitraGroupListConfig) => {
  const { queryKey = [queryKeyMitraGroup.MITRA_GROUP_LIST], params = { page: 1, page_size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MitraGroupListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.mitraGroup.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MitraGroupListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
