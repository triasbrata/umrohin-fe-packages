import {
  CustomerServiceListParams,
  CustomerServiceListResponse,
  CustomerServiceListResponseSchema,
} from '@apps/packages/services/master-customer-service'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { queryKeyMasterCustomerService } from '@apps/packages/lib/constants/queryKeyMasterCustomerService'
import apiServices from '@apps/packages/services'
import { useQueryList } from '../BaseMutation'

type useMasterCustomerServiceListConfig = {
  queryKey?: QueryKey
  params?: CustomerServiceListParams
  options?: UseQueryOptions<CustomerServiceListResponse>
}

export const useMasterCustomerServiceList = (opt?: useMasterCustomerServiceListConfig) => {
  const {
    queryKey = [queryKeyMasterCustomerService.CUSTOMER_SERVICE_LIST],
    params = { search: '', page: 1, size: 10, is_deleted: false },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()

  const placeholderData: CustomerServiceListResponse = useMemo(() => {
    const cachedData = queryClient.getQueryData<CustomerServiceListResponse>(queryKey)
    return (
      cachedData ?? {
        data: {
          data: [],
          pagination: {
            total: 0,
            totalPages: 0,
            currentPage: 1,
            currentPageFront: 1,
            totalPagesFront: 0,
          },
        },
        status: 200,
        success: true,
        message: '',
      }
    )
  }, [queryKey, queryClient])

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterPositions.getCustomerService({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) =>
      apiResponseValidation({
        response,
        schema: CustomerServiceListResponseSchema,
        placeholderData,
      }),
    ...options,
  })
}
