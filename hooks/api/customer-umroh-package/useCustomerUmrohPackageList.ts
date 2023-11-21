import { queryKeyCustomerTransactionsHistory } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerTransactionsHistoryParams,
  CustomerTransactionsHistoryResponse,
  CustomerTransactionsHistoryResponseSchema,
} from '@apps/packages/services/customer-transactions-history'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerTransactionHistoryListConfig = {
  queryKey?: QueryKey
  params?: CustomerTransactionsHistoryParams
  options?: UseQueryOptions<CustomerTransactionsHistoryResponse>
}

export const useCustomerTransactionHistoryList = (opt?: useCustomerTransactionHistoryListConfig) => {
  const {
    queryKey = [queryKeyCustomerTransactionsHistory.CUSTOMER_TRANSACTIONS_HISTORY_LIST],
    params = { take: 3, pointer: 1 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerTransactionsHistoryResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerTransactionsHistory.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerTransactionsHistoryResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
