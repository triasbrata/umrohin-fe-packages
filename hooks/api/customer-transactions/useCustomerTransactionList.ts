import { queryKeyCustomerTransactions } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerTransactionListParams,
  CustomerTransactionListResponse,
  CustomerTransactionListResponseSchema,
} from '@apps/packages/services/customer-transactions'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useCustomerTransactionListConfig = {
  queryKey?: QueryKey
  params?: CustomerTransactionListParams
  options?: UseQueryOptions<CustomerTransactionListResponse>
}

export const useCustomerTransactionList = (opt?: useCustomerTransactionListConfig) => {
  const {
    queryKey = [queryKeyCustomerTransactions.CUSTOMER_TRANSACTION_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerTransactionListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.customerTransaction.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerTransactionListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
