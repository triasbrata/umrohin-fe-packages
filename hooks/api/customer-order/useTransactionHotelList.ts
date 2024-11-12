import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useQueryList } from '../BaseMutation'
import { TransactionHotelListParams, TransactionHotelListResponse, TransactionHotelListResponseSchema } from '@apps/packages/services/transaction-hotel'

type useTransactionHotelListConfig = {
  queryKey?: QueryKey
  params?: TransactionHotelListParams
  options?: UseQueryOptions<TransactionHotelListResponse>
}

export const useTransactionHotelList = (opt?: useTransactionHotelListConfig) => {
  const {
    queryKey = ['transactionHotelList'],
    params = { sort_by: 'desc', order_by: 'created_at', page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: TransactionHotelListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    [queryClient, queryKey]
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.transactionHotel.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: TransactionHotelListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
