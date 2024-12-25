import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useQueryList } from '../BaseMutation'
import {
  TransactionHajiListParams,
  TransactionHajiListResponse,
  TransactionHajiListResponseSchema,
} from '@apps/packages/services/transaction-haji'
import { queryKeyTransactionHaji } from '@apps/packages/lib/constants/queryKeyTransactionHaji'

type useTransactionHajiListConfig = {
  queryKey?: QueryKey
  params?: TransactionHajiListParams
  options?: UseQueryOptions<TransactionHajiListResponse>
}

export const useTransactionHajiList = (opt?: useTransactionHajiListConfig) => {
  const {
    queryKey = [queryKeyTransactionHaji.TRANSACTION_HAJI_LIST],
    params = { sort_by: 'asc', order_by: 'created_at', page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: TransactionHajiListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    [queryClient, queryKey]
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.transactionHaji.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: TransactionHajiListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
