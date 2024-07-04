import { queryKeyCustomerOrder } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerOrderListParams,
  CustomerOrderListResponse,
  CustomerOrderListResponseSchema,
} from '@apps/packages/services/customer-order'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useCustomerOrderListConfig = {
  queryKey?: QueryKey
  params?: CustomerOrderListParams
  options?: UseQueryOptions<CustomerOrderListResponse>
}

export const useCustomerOrderList = (opt?: useCustomerOrderListConfig) => {
  const {
    queryKey = [queryKeyCustomerOrder.CUSTOMER_ORDER_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerOrderListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.customerOrder.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerOrderListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
