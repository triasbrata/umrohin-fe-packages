import { queryKeyCustomerTourLeader } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerTourLeadersParams,
  CustomerTourLeadersResponse,
  CustomerTourLeadersResponseSchema,
} from '@apps/packages/services/customer-tour-leader'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerTourLeadersConfig = {
  queryKey?: QueryKey
  params: CustomerTourLeadersParams
  options?: UseQueryOptions<CustomerTourLeadersResponse>
}

export const useCustomerTourLeaders = (opt: useCustomerTourLeadersConfig) => {
  const { queryKey = [queryKeyCustomerTourLeader.CUSTOMER_TOUR_LEADERS], params, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerTourLeadersResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerTourLeader.getTourLeaders({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerTourLeadersResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
