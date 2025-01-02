import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import apiServices from '@apps/packages/services'
import {
  MasterStatusHistoryListParams,
  MasterStatusHistoryListResponse,
  MasterStatusHistoryListResponseSchema,
} from '@apps/packages/services/master-status-history'
import { queryKeyMasterStatusHistory } from '@apps/packages/lib/constants/queryKeyMasterStatusHistory'

type useMasterStatusHistoryListConfig = {
  queryKey?: QueryKey
  params?: MasterStatusHistoryListParams
  options?: UseQueryOptions<MasterStatusHistoryListResponse>
}

export const useMasterStatusHistoryList = (opt?: useMasterStatusHistoryListConfig) => {
  const {
    queryKey = [queryKeyMasterStatusHistory.MASTER_STATUS_HISTORY_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterStatusHistoryListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterStatusHistory.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterStatusHistoryListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
