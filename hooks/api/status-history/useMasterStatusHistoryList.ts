import apiServices from '@apps/packages/services'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, useQueryClient } from '@tanstack/react-query'

import { useQueryList } from '../BaseMutation'
import { queryKeyStatusHistoryList } from '@apps/packages/lib/constants/queryKeyStatusHistory'
import {
  StatusHistoryListItem,
  StatusHistoryListResponse,
  StatusHistoryListResponseSchema,
} from '@apps/packages/services/status-history'
import { useMemo } from 'react'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'

type useStatusHistoryListConfig = {
  queryKey?: QueryKey
  params?: StatusHistoryListItem
}

export const useStatusHistoryList = (opt?: useStatusHistoryListConfig) => {
  const { queryKey = [queryKeyStatusHistoryList.STATUS_HISTORY_LIST] } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: StatusHistoryListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.statusHistory.getList(),
    refetchOnWindowFocus: false,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: StatusHistoryListResponseSchema,
        placeholderData,
      })
    },
  })
}
