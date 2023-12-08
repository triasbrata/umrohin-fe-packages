import { queryKeyCustomerTourLeader } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerTourLeaderHeaderParams,
  CustomerTourLeaderHeaderResponse,
  CustomerTourLeaderHeaderResponseSchema,
} from '@apps/packages/services/customer-tour-leader'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerTourLeaderHeaderConfig = {
  queryKey?: QueryKey
  params: CustomerTourLeaderHeaderParams
  options?: UseQueryOptions<CustomerTourLeaderHeaderResponse>
}

export const useCustomerTourLeaderHeader = (opt: useCustomerTourLeaderHeaderConfig) => {
  const { queryKey = [queryKeyCustomerTourLeader.CUSTOMER_TOUR_LEADER_HEADER], params, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerTourLeaderHeaderResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerTourLeader.getTourLeaderHeader({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerTourLeaderHeaderResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
