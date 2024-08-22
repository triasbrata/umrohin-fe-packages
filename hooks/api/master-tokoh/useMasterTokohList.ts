import { queryKeyMasterTokoh } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterTokohListParams,
  MasterTokohListResponse,
  MasterTokohListResponseSchema,
} from '@apps/packages/services/master-tokoh'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterTokohListConfig = {
  queryKey?: QueryKey
  params?: MasterTokohListParams
  options?: UseQueryOptions<MasterTokohListResponse>
}

export const useMasterTokohList = (opt?: useMasterTokohListConfig) => {
  const { queryKey = [queryKeyMasterTokoh.MASTER_TOKOH_LIST], params = { page: 1, size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterTokohListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterTokoh.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterTokohListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
