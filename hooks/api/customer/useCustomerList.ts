import { queryKeyCustomer } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import { CustomerListParams, CustomerListResponse, CustomerListResponseSchema } from '@apps/packages/services/customer'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useCustomerListConfig = {
  queryKey?: QueryKey
  params?: CustomerListParams
  options?: UseQueryOptions<CustomerListResponse>
}

export const useCustomerList = (opt?: useCustomerListConfig) => {
  const { queryKey = [queryKeyCustomer.CUSTOMER_LIST], params = { page: 1, page_size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.customer.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
