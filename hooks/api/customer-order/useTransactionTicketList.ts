import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  TransactionTicketListParams,
  TransactionTicketListResponse,
  TransactionTicketListResponseSchema,
} from '@apps/packages/services/transaction-ticket'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useQueryList } from '../BaseMutation'

type useTransactionTicketListConfig = {
  queryKey?: QueryKey
  params?: TransactionTicketListParams
  options?: UseQueryOptions<TransactionTicketListResponse>
}

export const useTransactionTicketList = (opt?: useTransactionTicketListConfig) => {
  const {
    queryKey = ['transactionTicketList'],
    params = { sort_by: 'asc', order_by: 'created_at', page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: TransactionTicketListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    [queryClient, queryKey]
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.transactionTicket.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: TransactionTicketListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
