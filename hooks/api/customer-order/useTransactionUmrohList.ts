import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useQueryList } from '../BaseMutation'
import {
  TransactionUmrohListParams,
  TransactionUmrohListResponse,
  TransactionUmrohListResponseSchema,
} from '@apps/packages/services/transaction-umroh'

type useTransactionUmrohListConfig = {
  queryKey?: QueryKey
  params?: TransactionUmrohListParams
  options?: UseQueryOptions<TransactionUmrohListResponse>
}

export const useTransactionUmrohList = (opt?: useTransactionUmrohListConfig) => {
  const {
    queryKey = ['transactionUmrohList'],
    params = { sort_by: 'asc', order_by: 'created_at', page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: TransactionUmrohListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    [queryClient, queryKey]
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.transactionUmroh.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: TransactionUmrohListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
