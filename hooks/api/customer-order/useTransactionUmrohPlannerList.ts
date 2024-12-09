import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useQueryList } from '../BaseMutation'
import {
  TransactionUmrohPlannerListParams,
  TransactionUmrohPlannerListResponse,
  TransactionUmrohPlannerListResponseSchema,
} from '@apps/packages/services/transaction-umroh-planner'

type useTransactionUmrohPlannerListConfig = {
  queryKey?: QueryKey
  params?: TransactionUmrohPlannerListParams
  options?: UseQueryOptions<TransactionUmrohPlannerListResponse>
}

export const useTransactionUmrohPlannerList = (opt?: useTransactionUmrohPlannerListConfig) => {
  const {
    queryKey = ['transactionUmrohPlannerList'],
    params = { sort_by: 'asc', order_by: 'created_at', page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: TransactionUmrohPlannerListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    [queryClient, queryKey]
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.transactionUmrohPlanner.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: TransactionUmrohPlannerListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
