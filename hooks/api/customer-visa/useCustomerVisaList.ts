import { queryKeyCustomerOrder } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerVisaListParams,
  CustomerVisaListResponse,
  CustomerVisaListResponseSchema,
} from '@apps/packages/services/customer-visa'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'
import { queryKeyCustomerVisas } from '@apps/packages/lib/constants/queryKeyCustomerVisa'

type useCustomerVisaListConfig = {
  queryKey?: QueryKey
  params?: CustomerVisaListParams
  options?: UseQueryOptions<CustomerVisaListResponse>
}

export const useCustomerVisaList = (opt?: useCustomerVisaListConfig) => {
  const {
    queryKey = [queryKeyCustomerVisas.CUSTOMER_VISA_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerVisaListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.customerVisa.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerVisaListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
